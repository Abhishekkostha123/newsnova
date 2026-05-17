import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Comment from "@/models/Comment";
import { rateLimit, isSpam, sanitizeContent } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { success: false, error: "postId is required" },
        { status: 400 }
      );
    }

    // Get top-level comments
    const comments = await Comment.find({
      postId,
      parentId: null,
      approved: true,
    })
      .sort({ createdAt: -1 })
      .lean();

    // Get all replies
    const replies = await Comment.find({
      postId,
      parentId: { $ne: null },
      approved: true,
    })
      .sort({ createdAt: 1 })
      .lean();

    // Nest replies
    const replyMap = new Map<string, typeof replies>();
    for (const reply of replies) {
      const parentId = reply.parentId!.toString();
      if (!replyMap.has(parentId)) {
        replyMap.set(parentId, []);
      }
      replyMap.get(parentId)!.push(reply);
    }

    const commentsWithReplies = comments.map((comment) => ({
      ...comment,
      replies: replyMap.get(comment._id.toString()) || [],
    }));

    return NextResponse.json({ success: true, data: commentsWithReplies });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const { success: allowed } = rateLimit(ip, 5, 60000);

    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many comments. Please wait a minute and try again.",
        },
        { status: 429 }
      );
    }

    await dbConnect();

    const body = await request.json();
    const { postId, parentId, author, content } = body;

    // Validation
    if (!postId || !author?.name || !author?.email || !content) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(author.email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Name validation
    if (author.name.length < 2 || author.name.length > 50) {
      return NextResponse.json(
        { success: false, error: "Name must be between 2 and 50 characters" },
        { status: 400 }
      );
    }

    // Content sanitization & spam check
    const sanitized = sanitizeContent(content);

    if (sanitized.length < 3) {
      return NextResponse.json(
        { success: false, error: "Comment is too short" },
        { status: 400 }
      );
    }

    if (isSpam(sanitized)) {
      return NextResponse.json(
        { success: false, error: "Comment was flagged as spam" },
        { status: 400 }
      );
    }

    const comment = await Comment.create({
      postId,
      parentId: parentId || null,
      author: {
        name: author.name.trim(),
        email: author.email.trim().toLowerCase(),
      },
      content: sanitized,
    });

    return NextResponse.json(
      { success: true, data: comment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to post comment" },
      { status: 500 }
    );
  }
}
