import Sidebar from "@/components/ui/sidebar";
import { UserDropdown } from "@/components/ui/userDropdown";
import { Info, Globe, Target, Mail, Eye } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function About() {
    return (
        <main className="flex flex-col justify-center items-center size-full">
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <Sidebar />

                <div className="flex flex-col">
                    <header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-6 lg:h-[70px]">
                        <UserDropdown />
                    </header>

                    <main className="flex flex-1 flex-col gap-6 p-6 lg:gap-8 lg:p-8 items-center">

                        {/* 2x2 grid of cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full mt-5">
                            
                            {/* About Us Card */}
                            <Card className="w-full max-w-md p-4">
                                <CardHeader className="flex items-center space-x-4">
                                    <Globe className="h-8 w-8 text-primary mb-2" />
                                    <CardTitle className="text-xl">About Us</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm lg:text-base text-muted-foreground">
                                        Welcome to Quizzly AI! Your innovative solution for quiz creation and learning enhancement.
                                        We specialize in harnessing the power of artificial intelligence to transform multi-page text 
                                        documents into interactive quizzes, making learning and assessment more engaging and efficient.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Our Mission Card */}
                            <Card className="w-full max-w-md p-4">
                                <CardHeader className="flex items-center space-x-4">
                                    <Target className="h-8 w-8 text-primary mb-2" />
                                    <CardTitle className="text-xl">Our Mission</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm lg:text-base text-muted-foreground">
                                        At Quizzly AI, our mission is to streamline the process of quiz creation
                                        by leveraging cutting-edge AI technology. We aim to provide educators, students, and
                                        professionals with a robust tool that simplifies the task of generating quizzes,
                                        allowing users to focus on what truly matters – learning and knowledge retention.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Our Vision Card */}
                            <Card className="w-full max-w-md p-4">
                                <CardHeader className="flex items-center space-x-4">
                                    <Eye className="h-8 w-8 text-primary mb-2" />
                                    <CardTitle className="text-xl">Our Vision</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm lg:text-base text-muted-foreground">
                                        We envision a future where educational tools are seamlessly integrated into everyday
                                        learning experiences. By combining AI technology with user-friendly interfaces, Quizzly AI
                                        seeks to revolutionize how quizzes are created and used, making knowledge assessment and
                                        acquisition a more dynamic and interactive process.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Get In Touch Card */}
                            <Card className="w-full max-w-md p-4">
                                <CardHeader className="flex items-center space-x-4">
                                    <Mail className="h-8 w-8 text-primary mb-2" />
                                    <CardTitle className="text-xl">Get In Touch</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm lg:text-base text-muted-foreground">
                                        We are committed to continuous improvement and are always eager to hear from our users. We are here 
                                        to assist you and ensure you get the most out of our platform. If you have any questions, feedback, 
                                        or need support, please feel free to <a href="mailto:support@example.com" className="text-primary underline">contact us</a>.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </main>
                </div>
            </div>
        </main>
    );
}
