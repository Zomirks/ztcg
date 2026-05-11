import { Link } from '@inertiajs/react';
import {
	BadgeCheckIcon,
	BarcodeIcon,
	ComponentIcon,
	LayoutGridIcon,
	PackageIcon,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
// import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import collectionItems from '@/routes/collection-items';
import products from '@/routes/products';
import sets from '@/routes/sets';
import tcgs from '@/routes/tcgs';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
		icon: LayoutGridIcon,
	},
	{
		title: 'Produits',
		href: products.index(),
		icon: BarcodeIcon,
	},
	{
		title: 'Sets',
		href: sets.index(),
		icon: ComponentIcon,
	},
    {
        title: 'TCG',
        href: tcgs.index(),
		icon: BadgeCheckIcon,
    },
    {
        title: 'Ma Collection',
        href: collectionItems.index(),
		icon: PackageIcon,
    },
];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: FolderGit2,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
