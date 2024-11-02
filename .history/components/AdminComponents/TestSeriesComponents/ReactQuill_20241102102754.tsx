import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

interface QuillEditorProps {
    showContent: boolean;
}
type Quill = any;


const QuillEditor: React.FC<QuillEditorProps> = ({ showContent }) => {
    const [value, setValue] = useState('');
    const quillRef = useRef<ReactQuill | null>(null);
    const [quill, setQuill] = useState<Quill | null>(null);
    const [alignment, setAlignment] = useState<string | null>(null);
    const [isWriting, setIsWriting] = useState(false);

    useEffect(() => {
        if (quillRef.current) {
            setQuill(quillRef.current.getEditor());
        }
    }, []);

    const handleChange = (content: string) => {
        setValue(content);
        const plainText = content.replace(/<[^>]+>/g, '').trim();
        setIsWriting(plainText.length > 0);
    };

    const handleBlur = () => setIsWriting(false);

    const handleIconClick = (format: string) => {
        if (quill) {
            const range = quill.getSelection();
            if (range) {
                const currentFormats = quill.getFormat(range);
                if (format === 'ordered') {
                    quill.format('list', currentFormats.list === 'ordered' ? false : 'ordered');
                } else if (format === 'bullet') {
                    quill.format('list', currentFormats.list === 'bullet' ? false : 'bullet');
                } else if (format.startsWith('align')) {
                    const alignType = format === 'align-left' ? false : format.split('-')[1];
                    quill.format('align', alignType);
                    setAlignment(alignType || 'left');
                } else {
                    const isActive = currentFormats[format];
                    quill.format(format, !isActive);
                }
            }
        }
    };

    const handleKeyDown = () => {
        if (quill) {
            const range = quill.getSelection();
            if (range) {
                const currentFormats = quill.getFormat(range);
                if (currentFormats.bold) quill.format('bold', false);
                if (currentFormats.italic) quill.format('italic', false);
                if (currentFormats.underline) quill.format('underline', false);
            }
        }
    };

    return (
        showContent && (
            <div className='px-4'>

                <div
                    className={`pt-2 bg-[#FFFFFF] border ${isWriting ? 'border-[#D6BBFB] shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]' : 'border-[#EAECF0]'
                        } rounded-[12px] h-auto`}
                >
                    <div className="bg-[#FFFFFF]">
                        <ReactQuill
                            ref={quillRef}
                            value={value}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            onBlur={handleBlur}
                            modules={{ toolbar: false }}
                            placeholder="Description"
                            className="text-[#1D2939] focus:outline-none rounded-b-[12px] custom-quill placeholder:not-italic min-h-[10px] max-h-[150px] overflow-y-auto border-none font-normal"
                        />
                    </div>

                    <div className="h-[66px] bg-[#FFFFFF] rounded-bl-[12px] rounded-br-[12px] flex justify-center items-center">
                        <div className="flex flex-row w-full justify-between items-center mx-5">
                            <div className="h-[24px] w-[288px] gap-[24px] flex flex-row">
                                <button onClick={() => handleIconClick('bold')}>
                                    <Image src="/icons/Bold.svg" width={24} height={24} alt="bold" />
                                </button>
                                <button onClick={() => handleIconClick('italic')}>
                                    <Image src="/icons/italic-icon.svg" width={24} height={24} alt="italic" />
                                </button>
                                <button onClick={() => handleIconClick('underline')}>
                                    <Image src="/icons/underline-icon.svg" width={24} height={24} alt="underline" />
                                </button>

                                <Popover backdrop="blur" placement="bottom-start">
                                    <PopoverTrigger>
                                        <button className="flex items-center justify-center p-1">
                                            {alignment === 'center' ? (
                                                <Image src="/icons/align-middle.svg" width={24} height={26} alt="align-center" />
                                            ) : alignment === 'right' ? (
                                                <Image src="/icons/align-right.svg" width={24} height={26} alt="align-right" />
                                            ) : (
                                                <Image src="/icons/dropdown-icon-1.svg" width={32} height={32} alt="align-left" />
                                            )}
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="ml-1 gap-4">
                                        <div className="flex flex-row bg-white rounded-[8px] border-[#EAECF0] p-2 w-[120px] shadow-[0_2px_4px_#EAECF0] gap-2">
                                            <button onClick={() => handleIconClick("align-left")}>
                                                <Image src="/icons/align-left.svg" width={30} height={30} alt="align-left" />
                                            </button>
                                            <button onClick={() => handleIconClick("align-center")}>
                                                <Image src="/icons/align-middle.svg" width={30} height={30} alt="align-center" />
                                            </button>
                                            <button onClick={() => handleIconClick("align-right")}>
                                                <Image src="/icons/align-right.svg" width={30} height={30} alt="align-right" />
                                            </button>
                                        </div>
                                    </PopoverContent>
                                </Popover>

                                <button onClick={() => handleIconClick('ordered')}>
                                    <Image src="/icons/dropdown-icon-2.svg" width={27} height={27} alt="ordered-list" />
                                </button>
                                <button onClick={() => handleIconClick('bullet')}>
                                    <Image src="/icons/dropdown-icon-3.svg" width={27} height={27} alt="bullet-list" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default QuillEditor;
