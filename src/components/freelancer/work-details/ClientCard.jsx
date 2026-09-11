import { motion } from "framer-motion";
import {
    FiMapPin,
    FiStar,
    FiCheckCircle,
    FiUser,
} from "react-icons/fi";

const ClientCard = ({ client }) => {
    const getClientName = () => {
        if (client?.name) {
            return client.name;
        }

        if (
            client?.firstName ||
            client?.lastName
        ) {
            return `${client.firstName || ""} ${client.lastName || ""
                }`.trim();
        }

        return "Client";
    };

    const getInitials = () => {
        const name = getClientName();

        return name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((word) => word[0])
            .join("")
            .toUpperCase();
    };

    const memberSince = client?.createdAt
        ? new Date(
            client.createdAt
        ).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        })
        : null;

    return (
        <motion.section
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-7"
            variants={{
                hidden: {
                    opacity: 0,
                    y: 25,
                },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.45,
                        ease: "easeOut",
                    },
                },
            }}
        >
            <h2 className="text-lg font-bold text-slate-900">
                About the Client
            </h2>

            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
                {client?.avatar ? (
                    <img
                        src={client.avatar}
                        alt={getClientName()}
                        className="h-16 w-16 rounded-2xl object-cover ring-1 ring-slate-100"
                    />
                ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-lg font-bold text-indigo-600">
                        {getInitials() || (
                            <FiUser className="h-6 w-6" />
                        )}
                    </div>
                )}

                <div className="min-w-0">
                    <h3 className="text-lg font-bold text-slate-900">
                        {getClientName()}
                    </h3>

                    {client?.title && (
                        <p className="mt-1 text-sm text-slate-500">
                            {client.title}
                        </p>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                        {client?.location && (
                            <span className="flex items-center gap-1.5 text-xs text-slate-500">
                                <FiMapPin className="h-3.5 w-3.5" />
                                {client.location}
                            </span>
                        )}

                        {client?.rating > 0 && (
                            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                                <FiStar className="h-3.5 w-3.5 fill-current text-amber-400" />
                                {client.rating}
                                {client.reviewsCount !==
                                    undefined && (
                                        <span className="text-slate-400">
                                            (
                                            {
                                                client.reviewsCount
                                            }{" "}
                                            reviews)
                                        </span>
                                    )}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2">
                {client?.paymentVerified && (
                    <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5">
                        <FiCheckCircle className="h-4 w-4 text-emerald-500" />

                        <span className="text-xs font-semibold text-emerald-600">
                            Payment verified
                        </span>
                    </div>
                )}

                {memberSince && (
                    <div className="rounded-xl bg-slate-50 px-3 py-2.5">
                        <p className="text-[11px] text-slate-400">
                            Member since
                        </p>

                        <p className="mt-0.5 text-xs font-semibold text-slate-700">
                            {memberSince}
                        </p>
                    </div>
                )}
            </div>
        </motion.section>
    );
};

export default ClientCard;