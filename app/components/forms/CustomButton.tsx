interface CustomButtonProps {
    label: string
    className?: string
    onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    className,
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            className={`text-center py-4 bg-airbnb hover:bg-airbnb-dark text-white rounded-xl transition cursor-pointer ${className}`}
        >
            {label}
        </button>
    )
}

export default CustomButton;