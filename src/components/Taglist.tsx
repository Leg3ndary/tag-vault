import * as React from "react";
import { motion } from "framer-motion";
import { TagData, ShortTagData } from "@/types";
import Tagbox from "@/components/Tagbox";
import { useState, useEffect } from "react";

export default function Taglist({
    tags,
    animDelay,
    staticDataList,
    page = 0,
}: {
    tags: TagData[] | ShortTagData[];
    animDelay: number;
    staticDataList?: TagData[] | null;
    page?: number;
}) {
    const [boxesView, setBoxesView] = useState<JSX.Element[] | null>(null);

    useEffect(() => {
        if (staticDataList) {
            let boxes: JSX.Element[] = [];
            const newLength = Math.min(21, staticDataList.length);

            for (let i = 0; i < newLength; i++) {
                boxes.push(
                    <motion.div
                        key={`tag-${tags[i].id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 1,
                            delay: (i + animDelay) * 0.2,
                        }}
                    >
                        <Tagbox
                            id={tags[i].id}
                            staticData={staticDataList[i]}
                        />
                    </motion.div>
                );
            }
            setBoxesView(boxes);
        } else {
            const newLength = Math.min(21, tags.length);
            let boxes: JSX.Element[] = [];

            for (let i = 21 * page; i < newLength; i++) {
                boxes.push(
                    <motion.div
                        key={`tag-${tags[i].id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 1,
                            delay: (i + animDelay) * 0.2,
                        }}
                    >
                        <Tagbox id={tags[i].id} />
                    </motion.div>
                );
            }
            setBoxesView(boxes);
        }
    }, [tags]);

    return (
        <div className="grid w-auto h-auto grid-cols-1 gap-2 py-5 mx-auto md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
            {boxesView}
        </div>
    );
}
