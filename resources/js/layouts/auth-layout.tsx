import AuthSplitLayout from '@/layouts/auth/auth-split-layout';

export default function AuthLayout({ 
    children, 
    title, 
    description, 
    image,
    ...props 
}: { 
    children: React.ReactNode; 
    title: string; 
    description: string;
    image?: string;
}) {
    return (
        <AuthSplitLayout 
            title={title} 
            description={description} 
            image={image}
            {...props}
        >
            {children}
        </AuthSplitLayout>
    );
}
