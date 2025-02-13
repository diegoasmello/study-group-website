import {
  loader,
  meta,
  default as PublicationsPage,
} from "./publications_.page.$page";

export { loader, meta };

export default function Publications() {
  return <PublicationsPage />;
}
