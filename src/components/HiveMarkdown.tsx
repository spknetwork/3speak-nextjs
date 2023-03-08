import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useEffect, useState } from "react";

export default function HiveMarkdown(props: any) {
  const [expanded, setExpanded] = useState(false);

  const body = props.children.replace(
    /(@\b[a-zA-Z]*)\b(?![^[]*\])(?![^>]*\<\/ ?a)/g,
    (username: string) => `[${username}](/${username})`
  );
  const maxLength = 300;
  useEffect(() => {
    console.log("body");
    console.log(body);
  }, [body]);
  useEffect(() => {
    console.log("props.children");
    console.log(props.children);
  }, [props.children]);

  return (
    <span>
      <ReactMarkdown
        components={{
          img: ({ node, ...props }) => (
            <img style={{ maxWidth: "100%" }} {...props} />
          ),
        }}
        remarkPlugins={[[remarkGfm]]}
        rehypePlugins={[rehypeRaw]}
      >
        {expanded ? body : body.slice(0, maxLength)}
      </ReactMarkdown>
      {body.length > maxLength && (
        <div
          onClick={() => setExpanded(!expanded)}
          style={{ color: "rgb(192,192,192)", cursor: "pointer" }}
        >
          Show {expanded ? "less" : "more"}
        </div>
      )}
    </span>
  );
}
