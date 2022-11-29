import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function HiveMarkdown(props: any) {
  const body = props.children.replace(/(?!>|\[)(@\b[a-zA-Z]*)\b(?!<|\])/g, (username: string) => (`[${username}](/${username})`))
  return (<ReactMarkdown remarkPlugins={[[remarkGfm]]} rehypePlugins={[rehypeRaw]}>{body}</ReactMarkdown>);
}