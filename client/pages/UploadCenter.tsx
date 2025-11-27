import { Layout } from "@/components/Layout";
import { UploadCenterTab } from "./accounts/tabs/UploadCenterTab";

export default function UploadCenter() {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <UploadCenterTab />
      </div>
    </Layout>
  );
}
