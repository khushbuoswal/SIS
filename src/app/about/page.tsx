import Sidebar from "@/components/ui/sidebar";
import { UserDropdown } from "@/components/ui/userDropdown";
import { Info } from "lucide-react";

export default function About() {
    return (
        <main className="flex flex-col justify-center items-center size-full">

            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <Sidebar />

                <div className="flex flex-col">
                    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                        <UserDropdown />
                    </header>
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        <div className="flex items-center">
                            <h1 className="text-lg font-semibold md:text-2xl">About Us</h1>
                        </div>
                        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-4">
                            <div className="flex flex-col items-center gap-4 text-center">
                                <Info className="h-12 w-12 text-primary" />
                                <h2 className="text-2xl font-bold tracking-tight">
                                    Welcome to Quizzly AI!
                                </h2>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Your innovative solution for quiz creation and learning
                                    enhancement. We specialize in harnessing the power of artificial intelligence to
                                    transform multi-page text documents into interactive quizzes, making learning and
                                    assessment more engaging and efficient.
                                </p>
                                <section className="mt-8">
                                    <h2 className="text-xl font-semibold text-center">Our Mission</h2>
                                    <div className="flex flex-col items-center gap-4 mt-4">
                                        <p className="text-sm text-muted-foreground mt-2">
                                            At Quizzly AI, our mission is to streamline the process of quiz creation
                                            by leveraging cutting-edge AI technology. We aim to provide educators, students, and
                                            professionals with a robust tool that simplifies the task of generating quizzes,
                                            allowing users to focus on what truly matters – learning and knowledge retention.
                                        </p>
                                    </div>
                                </section>
                                <section className="mt-8">
                                    <h2 className="text-xl font-semibold text-center">Our Vision</h2>
                                    <div className="flex flex-col items-center gap-4 mt-4">
                                        <p className="text-sm text-muted-foreground mt-2">
                                            We envision a future where educational tools are seamlessly integrated into everyday
                                            learning experiences. By combining AI technology with user-friendly interfaces, Quizzly AI
                                            seeks to revolutionize how quizzes are created and used, making knowledge assessment and
                                            acquisition a more dynamic and interactive process.
                                        </p>
                                    </div>
                                </section>
                                {/* New "Get In Touch" Section */}
                                <section className="mt-8">
                                    <h2 className="text-xl font-semibold text-center">Get In Touch</h2>
                                    <div className="flex flex-col items-center gap-4 mt-4">
                                        <p className="text-sm text-muted-foreground text-center">
                                            We are committed to continuous improvement and are always eager to hear from our users. We are here to assist you and ensure you get the most out of our platform. If you have any
                                            questions, feedback, or need support, please feel free to
                                            <a href="mailto:support@example.com" className="text-primary underline"> contact us</a>.
                                        </p>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </main>
    );
}

