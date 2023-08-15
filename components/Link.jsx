import NextLink from 'next/link';

export { Link };

function Link({ href, children, ...props }) {
    return (
        <NextLink legacyBehavior href={href}>
            <a {...props}>
                {children}
            </a>
        </NextLink>
    );
}
