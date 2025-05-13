import AppLogoIcon from './app-logo-icon';

export default function AppLogo({ className = "" }: { className?: string }) {
    return (
        <div className={`bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md ${className}`}>
            <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
        </div>
    );
}
