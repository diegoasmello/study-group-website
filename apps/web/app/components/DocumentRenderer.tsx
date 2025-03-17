import {
  DocumentRenderer as KSDocumentRenderer,
  DocumentRendererProps as KSDocumentRendererProps,
} from "@keystone-6/document-renderer";

const renderers: KSDocumentRendererProps["renderers"] = {
  block: {
    paragraph: ({ children }) => {
      return <p className="mb-2 text-inherit">{children}</p>;
    },
  },
};

interface DocumentRendererProps {
  document: KSDocumentRendererProps["document"];
}

export function DocumentRenderer({ document }: DocumentRendererProps) {
  return <KSDocumentRenderer document={document} renderers={renderers} />;
}
