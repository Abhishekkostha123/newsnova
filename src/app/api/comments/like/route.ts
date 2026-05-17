import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Comment from "@/models/Comment";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const { success: allowed } = rateLimit(`like-${ip}`, 30, 60000);

    if (!allowed) {
      return NextResponse.json(
        { success: false, error: "Too many likes. Please slow down." },
        { status: 429 }
      );
    }

    await dbConnect();

    const body = await request.json();
    const { commentId } = body;

    if (!commentId) {
      return NextResponse.json(
        { success: false, error: "commentId is required" },
        { status: 400 }
      );
    }

    // Use IP as unique identifier for like tracking
    const likeIdentifier = ip;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return NextResponse.json(
        { success: false, error: "Comment not found" },
        { status: 404 }
      );
    }

    // Toggle like
    const hasLiked = comment.likedBy.includes(likeIdentifier);

    if (hasLiked) {
      comment.likedBy = comment.likedBy.filter(
        (id: string) => id !== likeIdentifier
      );
      comment.likes = Math.max(0, comment.likes - 1);
    } else {
      comment.likedBy.push(likeIdentifier);
      comment.likes += 1;
    }

    await comment.save();

    return NextResponse.json({
      success: true,
      data: { likes: comment.likes, hasLiked: !hasLiked },
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      { success: false, error: "Failed to toggle like" },
      { status: 500 }
    );
  }
}
