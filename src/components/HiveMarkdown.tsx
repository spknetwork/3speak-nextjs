import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useState } from "react";

export default function HiveMarkdown(props: any) {
  const [expanded, setExpanded] = useState(false);
  
  const body = props.children.replace(
    /(@\b[a-zA-Z]*)\b(?![^[]*\])(?![^>]*\<\/ ?a)/g,
    (username: string) => (`[${username}](/${username})`)
  )
  const maxLength = 300

  return (
    <span>
      <ReactMarkdown remarkPlugins={[[remarkGfm]]} rehypePlugins={[rehypeRaw]}>
        {expanded ? body : body.slice(0, maxLength)}
      </ReactMarkdown>
      {body.length > maxLength && (
        <div onClick={() => setExpanded(!expanded)} style={{color: 'rgb(192,192,192)', cursor: 'pointer'}}>
          Show {expanded ? "less" : "more"}
        </div>
      )}
    </span>
  );
}