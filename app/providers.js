import { AssistantProvider } from "@/context/AssistantContext";

const Providers = ({ children }) => {
    return (<AssistantProvider>
        {children}
    </AssistantProvider>);

}
export default Providers