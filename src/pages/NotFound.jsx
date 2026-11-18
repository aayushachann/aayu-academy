import Layout from "../components/Layout";
import NotFoundCard from "../components/NotFoundCard";
import useTitle from "../lib/useTitle";

export default function NotFound() {
  useTitle("Page not found | AayuAcademy");
  return <Layout><NotFoundCard /></Layout>;
}
