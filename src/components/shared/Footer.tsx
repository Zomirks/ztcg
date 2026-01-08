const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="py-2 text-center">
            <p className="text-sm text-eternam-muted">
                © {currentYear} zTCG. Tous droits réservés.
            </p>
        </div>
    )
}
export default Footer