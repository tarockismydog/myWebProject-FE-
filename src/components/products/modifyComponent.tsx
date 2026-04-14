import { useState, type MouseEvent } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/resultModal";
import jwtAxios from "../../util/JWTUtil";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PendingModal from "../common/pendingModal";

function ModifyComponent({ product }: { product: ProductDTO }) {
    const { moveToRead, moveToList } = useCustomMove();
    const [images, setImages] = useState<string[]>([
        ...product.uploadFileNames,
    ]);
    const queryClient = useQueryClient();

    // 이미지 삭제 (화면상에서 제거)
    const deleteOldImages = (event: React.MouseEvent, target: string) => {
        event.preventDefault();
        setImages((prev) => prev.filter((img) => img !== target));
    };

    // 1. 수정 뮤테이션
    const modifyMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const res = await jwtAxios.put(
                `http://localhost:8080/api/products/${product.pno}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                },
            );
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["product", String(product.pno)],
            });
            queryClient.invalidateQueries({
                queryKey: ["products/list"],
                exact: false,
            });
        },
    });

    // 2. 삭제 뮤테이션 (사라졌던 기능!)
    const deleteMutation = useMutation({
        mutationFn: async () => {
            const res = await jwtAxios.delete(
                `http://localhost:8080/api/products/${product.pno}`,
            );
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products/list"],
                exact: false,
            });
            moveToList(); // 삭제 후 목록으로 이동
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // 버튼의 value에 따라 다른 동작 수행
        const submitter = (e.nativeEvent as SubmitEvent)
            .submitter as HTMLButtonElement;
        if (submitter.value === "modify") {
            modifyMutation.mutate(formData);
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 max-w-4xl mx-auto">
            {/* 결과 모달 */}
            {modifyMutation.data && (
                <ResultModal
                    title="수정 완료"
                    content="상품 정보가 변경되었습니다."
                    callbackFn={() => moveToRead(product.pno)}
                />
            )}
            {deleteMutation.isPending && <PendingModal />}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* ... 입력 필드들 (PNO, Name, Price 등) 은 이전과 동일 ... */}
                <div className="flex items-center gap-4">
                    <label className="w-1/4 p-4 text-slate-500 font-bold text-sm text-right">
                        PNO
                    </label>
                    <input
                        className="w-3/4 p-4 rounded-xl border border-slate-200 bg-slate-100 text-slate-400"
                        name="pno"
                        defaultValue={product.pno}
                        readOnly
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className="w-1/4 p-4 text-slate-500 font-bold text-sm text-right">
                        Name
                    </label>
                    <input
                        className="w-3/4 p-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-orange-500/10"
                        name="pname"
                        defaultValue={product.pname}
                        required
                    />
                </div>

                {/* 이미지 관리 영역 */}
                <div className="py-6">
                    <p className="text-slate-500 font-bold text-sm mb-4">
                        Current Images (Hover to Remove)
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                        {images.map((imgFile, i) => (
                            <div
                                key={i}
                                className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200"
                            >
                                <img
                                    className="w-full h-full object-cover"
                                    src={`http://localhost:8080/api/products/view/s_${imgFile}`}
                                />
                                <button
                                    onClick={(e) => deleteOldImages(e, imgFile)}
                                    className="absolute inset-0 bg-red-600/70 text-white opacity-0 group-hover:opacity-100 transition-opacity font-black flex items-center justify-center"
                                >
                                    REMOVE
                                </button>
                                <input
                                    type="hidden"
                                    name="uploadFileNames"
                                    value={imgFile}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- 하단 버튼 바 (삭제 버튼 추가 완료!) --- */}
                <div className="flex justify-end items-center gap-3 mt-10 pt-6 border-t border-slate-100">
                    {/* 취소 버튼 */}
                    <button
                        type="button"
                        onClick={() => moveToList()}
                        className="px-6 py-3 font-bold text-slate-400 hover:text-slate-600"
                    >
                        Cancel
                    </button>

                    {/* DB 삭제 버튼 (Red 스타일) */}
                    <button
                        type="button"
                        onClick={() => {
                            if (
                                window.confirm(
                                    "정말로 이 상품을 삭제하시겠습니까?",
                                )
                            )
                                deleteMutation.mutate();
                        }}
                        className="px-6 py-3 bg-rose-50 text-rose-600 rounded-xl font-bold hover:bg-rose-600 hover:text-white transition-all"
                    >
                        Delete Product
                    </button>

                    {/* 수정 완료 버튼 (Orange 스타일) */}
                    <button
                        type="submit"
                        name="actionType"
                        value="modify"
                        className="px-8 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 shadow-lg shadow-orange-100 transition-all"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
export default ModifyComponent;

// import { useActionState, useState } from "react";
// import useCustomMove from "../../hooks/useCustomMove";
// import axios from "axios";
// import PendingModal from "../common/pendingModal";
// import ResultModal from "../common/resultModal";
// import jwtAxios from "../../util/JWTUtil";

// interface ProductTaskResult {
//     actionType: string;
//     result: string;
//     error?: string;
// }

// const initState: ProductTaskResult = {
//     actionType: "modify",
//     result: "",
// };

// const modifyDeleteAsyncAction = async (
//     state: ProductTaskResult,
//     formData: FormData,
// ) => {
//     const pno = formData.get("pno") as string;
//     const actionType = formData.get("actionType") as string;

//     console.log("actionType : ", actionType);

//     let res;
//     if (actionType === "modify") {
//         res = await jwtAxios.put(
//             `http://localhost:8080/api/products/${pno}`,
//             formData,
//         );
//     } else if (actionType === "delete") {
//         res = await jwtAxios.delete(
//             `http://localhost:8080/api/products/${pno}`,
//         );
//     }

//     return { actionType: actionType, result: res?.data?.RESULT };
// };

// function ModifyComponent({ product }: { product: ProductDTO }) {
//     const [state, action, isPending] = useActionState(
//         modifyDeleteAsyncAction,
//         initState,
//     );

//     const { moveToList, moveToRead } = useCustomMove();

//     const [images, setImages] = useState<string[]>(product.uploadFileNames);

//     const deleteOldImages = (event: React.MouseEvent, target: string) => {
//         event.preventDefault();
//         event.stopPropagation();
//         // button을 눌렀을 때 버튼이벤트만 발생하게 하고
//         // form이 submit같은 기본동작을 막기 위함

//         setImages((prev) => prev.filter((img) => img !== target));

//         if (images.length === 0) {
//             setImages([]);
//         }
//     };

//     return (
//         <>
//             <div className="border-2 border-sky-200 mt-10 m-2 p-4 bg-white">
//                 {isPending && <PendingModal />}
//                 {state.result && (
//                     <ResultModal
//                         title="처리완료"
//                         content="처리완료"
//                         callbackFn={() => {
//                             if (state.actionType === "modify") {
//                                 moveToRead(product.pno);
//                             }
//                             if (state.actionType === "delete") {
//                                 moveToList();
//                             }
//                         }}
//                     />
//                 )}
//                 <form action={action}>
//                     <div className="flex justify-center mt-10">
//                         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//                             <div className="w-1/5 p-6 text-right font-bold">
//                                 PNO
//                             </div>
//                             <input
//                                 className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
//                                 name="pno"
//                                 required
//                                 defaultValue={product.pno}
//                             ></input>
//                         </div>
//                     </div>
//                     <div className="flex justify-center">
//                         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//                             <div className="w-1/5 p-6 text-right font-bold">
//                                 PNAME
//                             </div>
//                             <input
//                                 className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
//                                 name="pname"
//                                 required
//                                 defaultValue={product.pname}
//                             ></input>
//                         </div>
//                     </div>
//                     <div className="flex justify-center">
//                         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//                             <div className="w-1/5 p-6 text-right font-bold">
//                                 PRICE
//                             </div>
//                             <input
//                                 className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
//                                 name="price"
//                                 type={"number"}
//                                 defaultValue={product.price}
//                             ></input>
//                         </div>
//                     </div>
//                     <div className="flex justify-center">
//                         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//                             <div className="w-1/5 p-6 text-right font-bold">
//                                 PDESC
//                             </div>
//                             <textarea
//                                 className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
//                                 name="pdesc"
//                                 rows={4}
//                                 required
//                                 defaultValue={product.pdesc}
//                             ></textarea>
//                         </div>
//                     </div>
//                     <div className="flex justify-center">
//                         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//                             <div className="w-1/5 p-6 text-right font-bold">
//                                 Files
//                             </div>
//                             <input
//                                 className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
//                                 type={"file"}
//                                 name="files"
//                                 multiple={true}
//                             ></input>
//                         </div>
//                     </div>
//                     <div className="w-full justify-center flex flex-col m-auto items-center">
//                         {images.map((imgFile, i) => (
//                             <div
//                                 className="flex justify-center flex-col w-1/3"
//                                 key={i}
//                             >
//                                 <button
//                                     className="bg-blue-500 text-3xl text-white"
//                                     onClick={(event) =>
//                                         deleteOldImages(event, imgFile)
//                                     }
//                                 >
//                                     DELETE
//                                 </button>
//                                 <img
//                                     alt="img"
//                                     src={`http://localhost:8080/api/products/view/s_${imgFile}`}
//                                 />
//                                 <input
//                                     type="hidden"
//                                     name="uploadFileNames"
//                                     value={imgFile}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                     <div className="flex justify-end p-4">
//                         <button
//                             type="submit"
//                             name="actionType"
//                             value="delete"
//                             className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
//                         >
//                             Delete
//                         </button>
//                         <button
//                             type="submit"
//                             name="actionType"
//                             value="modify"
//                             className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-orange-500"
//                         >
//                             Modify
//                         </button>
//                         <button
//                             type="button"
//                             className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
//                             onClick={() => moveToList()}
//                         >
//                             List
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// }

// export default ModifyComponent;
