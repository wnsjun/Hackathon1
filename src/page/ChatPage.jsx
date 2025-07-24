import React from "react";

export const ChatPage = () => {
  return (
    <div className="flex flex-1 bg-[#F5F5F5] h-screen">
      {/* 채팅 목록 */}
      <aside
        className="w-[331px] h-[774px] bg-[#D9D9D9] m-12 p-6 flex-shrink-0"
        style={{ minHeight: "774px", height: "774px" }}
      >
        <h2 className="font-bold mb-4">채팅 목록</h2>
        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-6">
            <div className="flex justify-between">
              <span className="font-semibold">닉네임</span>
              <span className="text-xs text-gray-500">최근채팅시간</span>
            </div>
            <div className="text-sm text-gray-700">어쩌고저쩌고</div>
          </div>
        ))}
      </aside>

      {/* 채팅방 */}
      <section
        className="flex-1 m-12 p-8 bg-white border rounded"
        style={{ height: "774px" }}
      >
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold text-lg">닉네임</span>
          <button className="border px-4 py-2 rounded font-semibold">결제하기</button>
        </div>
        {/* 채팅 메시지 예시 */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="bg-gray-200 w-1/2 h-8 rounded" />
          <div className="bg-gray-200 w-1/3 h-8 rounded self-end" />
          <div className="bg-gray-200 w-1/4 h-8 rounded" />
          <div className="bg-gray-200 w-1/2 h-8 rounded self-end" />
        </div>
        {/* 입력창 */}
        <div className="flex items-center border rounded px-4 py-2">
          <input
            className="flex-1 outline-none"
            placeholder="메시지를 입력하세요"
          />
          <button className="ml-2">
            <span role="img" aria-label="send">
              📨
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};
