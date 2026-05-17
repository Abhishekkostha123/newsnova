import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
    title: "Contact NewsNova | Report News Tips & Advertising Inquiries",
    description:
        "Contact the NewsNova team for news tips, corrections, advertising, or support. We are your trusted source for breaking Jhansi news updates and national stories.",
    keywords: [
        "Contact NewsNova",
        "Jhansi news updates",
        "contact Jhansi news team",
        "news tips Jhansi",
        "advertise on NewsNova",
        "editorial team",
    ],
    openGraph: {
        title: "Contact NewsNova | Reach the Editorial Team",
        description:
            "Have a breaking story, news tip, or advertising inquiry? Get in touch with the NewsNova newsroom today.",
        url: "https://newsnova.online/contact",
        siteName: "NewsNova",
        type: "website",
    },
    alternates: {
        canonical: "https://newsnova.online/contact",
    },
};

export default function ContactPage() {
    return <ContactClient />;
}