
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const CustomMarkdown = ({ content }: { content: string | undefined}) => {
    return <ReactMarkdown rehypePlugins={[rehypeRaw] as any} remarkPlugins={[remarkGfm] as any}>{content || '<span></span>'}</ReactMarkdown>;
  };


  export default CustomMarkdown;