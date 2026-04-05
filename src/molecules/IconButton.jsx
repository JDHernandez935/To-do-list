import Button from "../atoms/Button";
import Icon from "../atoms/Icon";

function IconButton({ iconName, onClick, size=20, className="", iconClassName="" }){
    return(
        <Button
            onClick={onClick}
            className={`flex items-center justify-center ${className}`}
        >
            <Icon name={iconName} size={size} className={iconClassName} />
        </Button>
    )
}

export default IconButton