import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({
	title = '',
	description = '',
    children,
}: {
    children: React.ReactNode;
    title?: string;
    description?: string;
}) {
    return (
		<AuthLayoutTemplate title={title} description={description}>
            {children}
        </AuthLayoutTemplate>
    );
}
