import Image from "next/image";

interface TextContentProps {
    lessonContent: string;
    pdfLink: string;
    pdfSize: number;
}

function TextContent({lessonContent, pdfLink, pdfSize}:TextContentProps) {

    const handleDownload = (fileUrl: string, fileName: string) => {
        // Create an anchor element
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName; // This ensures the file is downloaded, not opened
        link.target = '_blank'; // Optional: in case the file is large, it opens in a new tab
        document.body.appendChild(link); // Append the link to the body
        link.click(); // Trigger the download
        document.body.removeChild(link); // Remove the link after download starts
      };
    
      const formatFileSize = (size: number): string => {
        if (size < 1024) return `${size} bytes`;
        else if (size >= 1024 && size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
        else if (size >= 1024 * 1024 && size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
        else return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
      };

      const extractFileNameFromUrl = (url: string): string => {
        const decodedUrl = decodeURIComponent(url);
        const parts = decodedUrl.split('/');
        const fileNameWithToken = parts[parts.length - 1];
        const fileName = fileNameWithToken.split('?')[0];
        return fileName;
    };
    
    return (
        <div className=" flex flex-col gap-[10px] flex-1">
            <div className=" font-bold text-1g text-[#1D2939] ">
                <span className="ml-8"> Content</span>
            </div>
            <div className='text-[#667085] text-base font-normal break-all ml-8 mr-4 mt-2 text-start'  dangerouslySetInnerHTML={{
                                    __html: lessonContent || '',
             }}/>
            {pdfLink && pdfSize > 0 && (
       <div className="w-fit h-auto rounded-md mt-[3px] bg-[#ffffff] border border-[#dbdbdb] flex flex-row p-3 ml-8 justify-between">
                    <div className="flex flex-row gap-2 items-start mr-[10px] w-[300px]">
                      <Image className="mt-1" src="/icons/file-02.svg" width={16} height={16} alt="File" />
                      <div className="flex flex-col break-all">
                        <p className="text-[13px]">{extractFileNameFromUrl(pdfLink)}</p>
                        <p className="text-[11px]">{formatFileSize(pdfSize)}</p>
                      </div>
                    </div>
                    <button className="w-[24px] h-[24px]" onClick={() => handleDownload(pdfLink, extractFileNameFromUrl(pdfLink) ?? '')}>
                      <Image className='w-[24px] h-[24px]' src="/icons/download.svg" width={24} height={24} alt="Download" />
                    </button>
                  </div>
            )}
        </div>
    )
}
export default TextContent;