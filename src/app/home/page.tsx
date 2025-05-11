"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../lib/hooks/useAuth";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Components } from "react-markdown";
import mermaid from "mermaid";

export default function HomePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [markdownInput, setMarkdownInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mermaidRef = useRef<HTMLDivElement>(null);
  
  // Animation states
  const [showAnimationInput, setShowAnimationInput] = useState(false);
  const [animationCode, setAnimationCode] = useState("");
  const [savedAnimation, setSavedAnimation] = useState("");

  // Mermaid states
  const [showMermaidInput, setShowMermaidInput] = useState(false);
  const [mermaidCode, setMermaidCode] = useState("");
  const [savedMermaidCode, setSavedMermaidCode] = useState("");
  const [mermaidSvg, setMermaidSvg] = useState("");
  const [showMermaidModal, setShowMermaidModal] = useState(false);

  // Initialize mermaid
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });
  }, []);

  // Render mermaid diagram when code changes
  useEffect(() => {
    if (savedMermaidCode && mermaidRef.current) {
      try {
        mermaid.render('mermaid-diagram', savedMermaidCode).then((result) => {
          setMermaidSvg(result.svg);
        });
      } catch (error) {
        console.error("Failed to render mermaid diagram:", error);
      }
    }
  }, [savedMermaidCode]);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowMermaidModal(false);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Auto-resize textarea function
  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      // Reset height first to get accurate scrollHeight
      textareaRef.current.style.height = 'auto';
      // Set to scrollHeight to fit content
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  // Example markdown for users to see formatting capabilities
  const exampleMarkdown = `# Welcome to Deep Research

## This is a markdown editor with live preview

You can write:
- **Bold text**
- *Italic text*
- ~~Strikethrough~~

### Code blocks
\`\`\`javascript
// Here's some code
function hello() {
  console.log("Hello, world!");
}
\`\`\`

### Tables
| Feature | Description |
|---------|-------------|
| Tables | Supported with GFM |
| Lists | Ordered and unordered |
| Links | [Click here](https://example.com) |

> Blockquotes are also supported

![Image placeholder](https://via.placeholder.com/150)
`;

  // Example animation code
  const exampleAnimationCode = `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="50" fill="#6366F1">
    <animate attributeName="r" values="50;70;50" dur="2s" repeatCount="indefinite" />
    <animate attributeName="fill" values="#6366F1;#8B5CF6;#6366F1" dur="2s" repeatCount="indefinite" />
  </circle>
</svg>`;

  // Example mermaid code
  const exampleMermaidCode = `graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B`;

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  // Auto-resize when content changes
  useEffect(() => {
    autoResizeTextarea();
  }, [markdownInput]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownInput(e.target.value);
    
    // Simulate AI processing
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 500);
  };

  const handleShowExample = () => {
    setMarkdownInput(exampleMarkdown);
    // Simulate AI processing
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 500);
  };

  // Animation handlers
  const handleToggleAnimationInput = () => {
    setShowAnimationInput(!showAnimationInput);
    if (!animationCode) {
      setAnimationCode(exampleAnimationCode);
    }
  };

  const handleAnimationInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnimationCode(e.target.value);
  };

  const handleSaveAnimation = () => {
    setSavedAnimation(animationCode);
    setShowAnimationInput(false);
  };

  const handleCancelAnimation = () => {
    setShowAnimationInput(false);
  };

  // Mermaid handlers
  const handleToggleMermaidInput = () => {
    setShowMermaidInput(!showMermaidInput);
    if (!mermaidCode) {
      setMermaidCode(exampleMermaidCode);
    }
  };

  const handleMermaidInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMermaidCode(e.target.value);
  };

  const handleSaveMermaid = () => {
    setSavedMermaidCode(mermaidCode);
    setShowMermaidInput(false);
  };

  const handleCancelMermaid = () => {
    setShowMermaidInput(false);
  };

  const handleOpenMermaidModal = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the edit mode
    setShowMermaidModal(true);
  };

  const handleCloseMermaidModal = () => {
    setShowMermaidModal(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // For admin access
  const isAdmin = user?.email === 'youradminemail@example.com';

  // Custom components for markdown rendering
  const customComponents: Components = {
    h1: ({children, ...props}) => <h1 className="text-2xl font-bold mb-4 mt-0 pb-2 border-b" {...props}>{children}</h1>,
    h2: ({children, ...props}) => <h2 className="text-xl font-bold mt-6 mb-4" {...props}>{children}</h2>,
    h3: ({children, ...props}) => <h3 className="text-lg font-bold mt-5 mb-3" {...props}>{children}</h3>,
    p: ({children, ...props}) => <p className="mb-4 leading-relaxed" {...props}>{children}</p>,
    a: ({children, ...props}) => <a className="text-blue-600 hover:underline" {...props}>{children}</a>,
    ul: ({children, ...props}) => <ul className="list-disc pl-6 mb-4" {...props}>{children}</ul>,
    ol: ({children, ...props}) => <ol className="list-decimal pl-6 mb-4" {...props}>{children}</ol>,
    li: ({children, ...props}) => <li className="mb-1" {...props}>{children}</li>,
    blockquote: ({children, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4" {...props}>{children}</blockquote>,
    code: ({className, children, ...props}: any) => {
      const match = /language-(\w+)/.exec(className || '');
      const isInline = !className;

      if (isInline) {
        return <code className="bg-gray-100 text-red-600 px-1 rounded text-sm font-mono" {...props}>{children}</code>
      }
      
      return (
        <div className="bg-gray-900 rounded-md overflow-hidden my-4">
          {match && <div className="px-4 py-2 text-xs text-gray-400 bg-gray-800">{match[1]}</div>}
          {!match && <div className="px-4 py-2 text-xs text-gray-400 bg-gray-800">Code</div>}
          <pre className="p-4 overflow-auto">
            <code className="text-gray-100 text-sm" {...props}>{children}</code>
          </pre>
        </div>
      )
    },
    table: ({children, ...props}) => <table className="min-w-full divide-y divide-gray-300 my-6 border" {...props}>{children}</table>,
    thead: ({children, ...props}) => <thead className="bg-gray-50" {...props}>{children}</thead>,
    th: ({children, ...props}) => <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900 border-r last:border-r-0" {...props}>{children}</th>,
    td: ({children, ...props}) => <td className="py-2 px-4 text-sm border-r last:border-r-0 border-t" {...props}>{children}</td>,
    img: ({src, ...props}) => (
      <div className="flex justify-center my-6">
        <img className="max-w-full rounded shadow-md" src={src} alt={props.alt || "Image"} {...props} />
      </div>
    ),
  };

  return (
    <main className="min-h-screen bg-gray-100 pb-10">
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold">Deep Research</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              Hello, {user?.displayName} 
              <span className="text-gray-400 text-sm ml-1">({user?.email})</span>
            </span>
            {isAdmin && (
              <Link 
                href="/admin" 
                className="text-indigo-600 hover:text-indigo-800"
              >
                Admin
              </Link>
            )}
            <button 
              onClick={signOut}
              className="text-red-500 hover:text-red-700"
            >
              Sign Out
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-medium">Input Markdown</h2>
              <button 
                onClick={handleShowExample}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded"
              >
                Show Example
              </button>
            </div>
            <div className="p-4">
              <textarea 
                ref={textareaRef}
                className="w-full min-h-[200px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-gray-800 bg-white font-mono text-sm overflow-hidden"
                placeholder="Paste your markdown content here..."
                value={markdownInput}
                onChange={handleInputChange}
                style={{ height: 'auto' }}
              ></textarea>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Preview</h2>
            </div>
            
            {/* Animation Section */}
            <div className="p-4 border-b bg-gray-50">
              {showAnimationInput ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-700">Add Animation</h3>
                    <div className="flex gap-2">
                      <button 
                        onClick={handleSaveAnimation}
                        className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded"
                      >
                        Save Animation
                      </button>
                      <button 
                        onClick={handleCancelAnimation}
                        className="text-xs bg-gray-300 hover:bg-gray-400 text-gray-700 px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  <textarea 
                    className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-gray-800 bg-white font-mono text-xs overflow-auto"
                    placeholder="Paste SVG animation code here..."
                    value={animationCode}
                    onChange={handleAnimationInputChange}
                  ></textarea>
                  <div className="text-xs text-gray-500">
                    Paste SVG animation code here (SVG with animate tags)
                  </div>
                </div>
              ) : (
                <div 
                  onClick={handleToggleAnimationInput}
                  className="flex flex-col items-center cursor-pointer py-2 hover:bg-gray-100 rounded transition-colors"
                >
                  {savedAnimation ? (
                    <div className="flex flex-col items-center">
                      <div className="mb-2" dangerouslySetInnerHTML={{ __html: savedAnimation }}></div>
                      <span className="text-sm text-indigo-600 font-medium">Click to edit animation</span>
                    </div>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="text-indigo-500 font-medium mt-1">Click to add animation</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mermaid Diagram Section */}
            <div className="p-4 border-b bg-gray-50">
              {showMermaidInput ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-700">Add Mermaid Diagram</h3>
                    <div className="flex gap-2">
                      <button 
                        onClick={handleSaveMermaid}
                        className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded"
                      >
                        Save Diagram
                      </button>
                      <button 
                        onClick={handleCancelMermaid}
                        className="text-xs bg-gray-300 hover:bg-gray-400 text-gray-700 px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  <textarea 
                    className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-gray-800 bg-white font-mono text-xs overflow-auto"
                    placeholder="Paste mermaid diagram code here..."
                    value={mermaidCode}
                    onChange={handleMermaidInputChange}
                  ></textarea>
                  <div className="text-xs text-gray-500">
                    Paste mermaid diagram syntax here (flowcharts, sequence diagrams, etc.)
                  </div>
                </div>
              ) : (
                <div className="py-2">
                  <div 
                    onClick={handleToggleMermaidInput}
                    className="flex flex-col items-center cursor-pointer hover:bg-gray-100 rounded transition-colors pb-2"
                  >
                    {mermaidSvg ? (
                      <div className="flex flex-col items-center">
                        <div className="mb-2 max-w-full overflow-auto" dangerouslySetInnerHTML={{ __html: mermaidSvg }}></div>
                        <span className="text-sm text-indigo-600 font-medium">Click to edit diagram</span>
                      </div>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-green-500 font-medium mt-1">Click to add diagram</span>
                      </>
                    )}
                  </div>
                  
                  {mermaidSvg && (
                    <div className="flex justify-center mt-2">
                      <button 
                        onClick={handleOpenMermaidModal}
                        className="flex items-center text-xs bg-green-50 hover:bg-green-100 text-green-700 px-2 py-1 rounded border border-green-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Fullscreen
                      </button>
                    </div>
                  )}
                </div>
              )}
              <div ref={mermaidRef} className="hidden"></div>
            </div>

            <div className="p-4 prose prose-slate lg:prose-lg max-w-none min-h-[200px] text-gray-800 markdown-preview">
              {isProcessing ? (
                <div className="flex justify-center items-center h-full min-h-[200px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : (
                markdownInput ? (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={customComponents}
                  >
                    {markdownInput}
                  </ReactMarkdown>
                ) : (
                  <div className="text-gray-400 italic">Preview will appear here...</div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mermaid Fullscreen Modal */}
      {showMermaidModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-screen-xl w-full max-h-screen-lg overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-semibold">Mermaid Diagram</h3>
              <button 
                onClick={handleCloseMermaidModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-8 overflow-auto flex items-center justify-center bg-gray-100 flex-grow">
              <div className="transform scale-150 origin-center" dangerouslySetInnerHTML={{ __html: mermaidSvg }}></div>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-between">
              <div className="text-sm text-gray-500">Press ESC to close</div>
              <button 
                onClick={handleCloseMermaidModal}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 