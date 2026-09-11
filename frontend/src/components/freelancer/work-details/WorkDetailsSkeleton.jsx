const WorkDetailsSkeleton = () => {
    return (
        <div className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 sm:py-8">
            <div className="mx-auto max-w-7xl animate-pulse">

                <div className="mb-5 h-5 w-32 rounded bg-slate-200" />

                <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-7">
                    <div className="flex gap-4">
                        <div className="h-14 w-14 shrink-0 rounded-2xl bg-slate-200" />

                        <div className="flex-1">
                            <div className="h-8 max-w-xl rounded-lg bg-slate-200" />

                            <div className="mt-3 h-4 max-w-sm rounded bg-slate-200" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">

                    <div className="space-y-6">
                        <div className="rounded-2xl bg-white p-7 shadow-sm">
                            <div className="h-6 w-48 rounded bg-slate-200" />

                            <div className="mt-6 space-y-3">
                                <div className="h-4 rounded bg-slate-200" />
                                <div className="h-4 rounded bg-slate-200" />
                                <div className="h-4 w-5/6 rounded bg-slate-200" />
                                <div className="h-4 w-4/6 rounded bg-slate-200" />
                            </div>
                        </div>

                        <div className="rounded-2xl bg-white p-7 shadow-sm">
                            <div className="h-6 w-40 rounded bg-slate-200" />

                            <div className="mt-6 flex gap-2">
                                <div className="h-9 w-20 rounded-xl bg-slate-200" />
                                <div className="h-9 w-24 rounded-xl bg-slate-200" />
                                <div className="h-9 w-28 rounded-xl bg-slate-200" />
                            </div>
                        </div>

                        <div className="rounded-2xl bg-white p-7 shadow-sm">
                            <div className="h-6 w-40 rounded bg-slate-200" />

                            <div className="mt-6 flex gap-4">
                                <div className="h-16 w-16 rounded-2xl bg-slate-200" />

                                <div className="flex-1">
                                    <div className="h-5 w-40 rounded bg-slate-200" />
                                    <div className="mt-2 h-4 w-28 rounded bg-slate-200" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm lg:h-[520px]">
                        <div className="h-6 w-32 rounded bg-slate-200" />

                        <div className="mt-8 space-y-7">
                            <div className="h-10 rounded bg-slate-200" />
                            <div className="h-10 rounded bg-slate-200" />
                            <div className="h-10 rounded bg-slate-200" />
                            <div className="h-10 rounded bg-slate-200" />
                            <div className="h-12 rounded-xl bg-slate-200" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default WorkDetailsSkeleton;