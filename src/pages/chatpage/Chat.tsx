import SyntaxHighlighter from "react-syntax-highlighter";
import Logo from "../../assets/icons/Logo";
import style from "../../assets/styles/pages/chatpage.module.scss";
import { useChat } from "../../store/chat";
import Markdown from "react-markdown";
import { tomorrowNightBright } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
import ArrowDown from "../../assets/icons/ArrowDown";
import { useLoading } from "../../store/chatLoading";
import LoaderDot from "../../assets/icons/animated/LoaderDot";
import Copy2 from "../../assets/icons/Copy2";
import { copyToClipboard } from "../../utils/CopyToClipboard";
import { useLocation } from "react-router-dom";
import { useCurrentChatId } from "../../store/currectChatId";
import { getChatContent } from "../../services/getChatContent";

const Chat = () => {
  const { setChat, chats, streamingText } = useChat();
  const { loading } = useLoading();
  const location = useLocation();
  const { setCurrentChatId } = useCurrentChatId();
  useEffect(() => {
    getIdFromUrl(false);
  }, [chats, loading, location.pathname, streamingText]);

  useEffect(() => {
    getIdFromUrl(true);
  }, []);

  const getIdFromUrl = async (getContent: boolean) => {
    if (location.pathname.includes("/dashboard/chats/")) {
      const splittedPathname = location.pathname.split("/");
      const id = splittedPathname[splittedPathname.length - 1];
      setCurrentChatId(id);
      if (getContent && !chats.length) {
        const res = await getChatContent(id);
        setChat(res);
      }
    }
  };



  const MarkdownWithSyntax = ({ content }: { content: string }) => {
    const [copiedBlocks, setCopiedBlocks] = useState<{ [key: string]: boolean }>({});

    // Add a preprocessing step for the content
    const processContent = (text: string) => {
      // Fix the pattern where a colon appears on the next line after bold text
      return text.replace(/\*\*(.*?)\*\*\n\s*:/g, '**$1:**');
    };

    const handleCopy = (codeContent: string, blockId: string) => {
      copyToClipboard(codeContent);
      setCopiedBlocks(prev => ({ ...prev, [blockId]: true }));
      setTimeout(() => {
        setCopiedBlocks(prev => ({ ...prev, [blockId]: false }));
      }, 1000);
    };

    return (
      <Markdown
        children={processContent(content)}
        components={{
          code({ node, className, children, ...props }) {
            const language = className
              ? className.replace("language-", "")
              : null;
            if (language) {
              return (
                <>
                  <div className={style.pre_header}>
                    {language}
                    <div className={style.sticky_button_wrapper}>
                      <div className={style.sticky_button_cont}>
                        <button
                          onClick={() => {
                            if (children) {
                              const blockId = `${language}-${children.toString().slice(0, 20)}`;
                              handleCopy(children.toString(), blockId);
                            }
                          }}
                          className={style.copyButton}
                        >
                          <span className={style.copyIcon}>
                            {copiedBlocks[`${language}-${children?.toString().slice(0, 20)}`] ? (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 6L9 17L4 12" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            ) : (
                              <Copy2 />
                            )}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <SyntaxHighlighter
                    style={tomorrowNightBright}
                    className={style.markdown_cont}
                    showLineNumbers={true}
                    lineNumberStyle={{
                      minWidth: '2.5em',
                      paddingRight: '1em',
                      color: '#666',
                      textAlign: 'right',
                      userSelect: 'none',
                      marginRight: '1em',
                      borderRight: '1px solid #333',
                    }}
                    customStyle={{
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "100%",
                      maxWidth: "100%",
                      backgroundColor: "#0d0d0d",
                      padding: "1rem 0",
                      overflowX: "auto",
                      overflow: "visible !important",
                    }}
                    language={language}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    );
  };

  return (
    <div className={style.chatPage}>
      <ScrollToBottom 
        className={style.chat}
        followButtonClassName={style.arrow_down}
        initialScrollBehavior="auto"
        mode="bottom"
        followButtonChildren={<ArrowDown />}
        debounce={100}
      >
        {chats.map((message, i) => {
          return message.Role === "user" ? (
            <div key={i} className={`${style.wrapper}`}>
              {message.Image && (
                <div className={style.img_wrapper}>
                  <div className={style.img_cont}>
                    <img src={message.Image} alt="" />
                  </div>
                </div>
              )}
              {message.Parts[0].Text.length !== 0 && (
                <div className={`${style.message} ${style.user}`}>
                  {message.Parts[0].Text}
                </div>
              )}
            </div>
          ) : (
            <div key={i} className={`${style.wrapper}`}>
              <div className={`${style.message}`}>
                <div className={style.AIIcon}>
                  <div className={style.logo}>
                    <Logo />
                  </div>
                </div>
                <div className={style.text}>
                  <MarkdownWithSyntax content={message.Parts[0].Text} />
                </div>
              </div>
            </div>
          );
        })}
        {loading && streamingText && (
          <div className={`${style.wrapper}`}>
            <div className={`${style.message}`}>
              <div className={style.AIIcon}>
                <div className={style.logo}>
                  <Logo />
                </div>
              </div>
              <div className={style.text}>
                <MarkdownWithSyntax content={streamingText} />
              </div>
            </div>
          </div>
        )}
        {loading && !streamingText && (
          <div className={style.loading_response}>
            <div className={style.AIIcon}>
              <div className={style.logo}>
                <Logo />
              </div>
            </div>
            <div className={style.loader}>
              <LoaderDot />
            </div>
          </div>
        )}
      </ScrollToBottom>
    </div>
  );
};

export default Chat;
