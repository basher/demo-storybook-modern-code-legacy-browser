import { WebUIDisclosureHtml } from "./WebUIDisclosure";

export default {
    title: "Web Components/<webui-disclosure>",
    parameters: {
        status: {
            type: "stable",
        },
    },
    argTypes: {
        bindEscapeKey: {
            control: "boolean",
            description: "Close with ESC key.",
        },
        bindClickOutside: {
            control: "boolean",
            description: "Close by clicking outside",
        },
    },
};

export const WebUIDisclosure = {
    args: {
        bindEscapeKey: false,
        bindClickOutside: false,
    },
    render: (args) => WebUIDisclosureHtml(args),
};
WebUIDisclosure.storyName = "<webui-disclosure>";
