import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface PlaceholderProps {
  pageName: string;
}

export function Placeholder({ pageName }: PlaceholderProps) {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-4xl">🔨</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{pageName}</h1>
          <p className="text-gray-600 mb-8">
            This page is coming soon! We're building something amazing here.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Continue prompting in the chat to fill in this page's contents if you'd like it built.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </Layout>
  );
}
