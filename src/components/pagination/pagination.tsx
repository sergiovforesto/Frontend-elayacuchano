'use client'
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation";
import { generatePagination } from "@/helpers/generate-pagination";

interface Props {
    totalPages: number;
}

export const Pagination = ({ totalPages, }: Props) => {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const allPages = generatePagination(currentPage, totalPages);



    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);

        params.set('page', pageNumber.toString());

        return `${pathname}?${params.toString()}`;
    };

    return (
        <nav className="flex items-center flex-column flex-wrap md:flex-row justify-end p-4">


            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">


                <PaginationArrow
                    direction="left"
                    href={createPageURL(currentPage - 1)}
                    isDisabled={currentPage <= 1}
                />
                {allPages.map((page, index) => {
                    let position: 'first' | 'last' | 'middle' | 'single' | undefined;

                    if (index === 0) position = 'first';
                    if (index === allPages.length - 1) position = 'last';
                    if (allPages.length === 1) position = 'single';
                    if (page === '...') position = 'middle';

                    return (
                        <PaginationNumber
                            key={page}
                            href={createPageURL(page)}
                            page={page}
                            position={position}
                            isActive={currentPage === page}
                        />
                    );
                })}

                <PaginationArrow
                    direction="right"
                    href={createPageURL(currentPage + 1)}
                    isDisabled={currentPage >= totalPages}
                />

            </ul>
        </nav>
    )
}

interface PaginationNumberProps {
    page: string | number;
    href: string;
    isActive: boolean;
    position: ('first' | 'last' | 'middle' | 'single' | undefined)
}
function PaginationNumber({ page, href, isActive, position }: PaginationNumberProps) {
    const stylesDefault = 'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700';

    const roundedLeft = (position === 'first' || position === 'single');
    const roundedRight = (position === 'last' || position === 'single');
    const activeStyles = isActive ? 'z-10 bg-primary border-bg-primary' : '';
    const hoverStyles = !isActive && position !== 'middle' ? 'hover:bg-gray-100' : '';
    const middleStyles = position === 'middle' ? 'text-blue-300' : '';

    const className = `${stylesDefault} ${roundedLeft} ${roundedRight} ${activeStyles} ${hoverStyles} ${middleStyles}`;

    return isActive || position === 'middle' ? (
        <div className={className}>
            {page}
        </div>
    ) : (
        <Link href={href} className={className}>
            {page}
        </Link>
    );
}

interface PaginationArrow {
    href: string;
    direction: ('left' | 'right');
    isDisabled: boolean;
}
function PaginationArrow({ href, direction, isDisabled }: PaginationArrow) {
    const icon =
        direction === 'left' ? (
            'Prev'
        ) : (
            'Next'
        );

    const stylesDefault = 'flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700'

    return isDisabled ? (
        <div
            className={
                `${stylesDefault} ${isDisabled && 'pointer-events-none text-gray-300'} 
                ${!isDisabled && 'hover:bg-gray-100'}
                ${direction === 'left' && 'rounded-s-lg'}
                ${direction === 'right' && 'rounded-e-lg'}
                `
            }
        >{icon}
        </div>
    ) : (
        <Link
            className={
                `${stylesDefault} ${isDisabled && 'pointer-events-none text-gray-300'} 
                ${!isDisabled && 'hover:bg-gray-100'}
                ${direction === 'left' && 'rounded-s-lg'}
                ${direction === 'right' && 'rounded-e-lg'}
                `
            }
            href={href}
        >
            {icon}
        </Link>

    );
}