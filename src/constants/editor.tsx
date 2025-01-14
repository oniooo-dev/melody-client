import UploadToolPanel from "@/components/editor/panels/UploadToolPanel"
import TextToolPanel from "@/components/editor/panels/TextToolPanel"
import AssetsToolPanel from "@/components/editor/panels/AssetsToolPanel"
import VoiceoverToolPanel from "@/components/editor/panels/VoiceoverToolPanel"
import CaptionsToolPanel from "@/components/editor/panels/CaptionsToolPanel"
import AnimationsToolPanel from "@/components/editor/panels/AnimationsToolPanel"
import StickersToolPanel from "@/components/editor/panels/StickersToolPanel"
import FiltersToolPanel from "@/components/editor/panels/FiltersToolPanel"

interface Tool {
    label: string
    icon: string
    aiTool: boolean
}

export const TOOLS: Tool[] = [
    {
        label: 'Upload',
        icon: '/assets/editor/icons/upload.png',
        aiTool: false,
    },
    {
        label: 'Text',
        icon: '/assets/editor/icons/text.png',
        aiTool: false,
    },
    {
        label: 'Assets',
        icon: '/assets/editor/icons/assets.png',
        aiTool: false,
    },
    {
        label: 'Stickers',
        icon: '/assets/editor/icons/stickers.png',
        aiTool: false,
    },
    {
        label: 'Voiceover',
        icon: '/assets/editor/icons/voiceover.png',
        aiTool: true,
    },
    {
        label: 'Captions',
        icon: '/assets/editor/icons/captions.png',
        aiTool: true,
    },
    {
        label: 'Animations',
        icon: '/assets/editor/icons/animations.png',
        aiTool: false,
    },
    {
        label: 'Filters',
        icon: '/assets/editor/icons/filters.png',
        aiTool: false,
    },
]

interface ToolPanel {
    label: string
    component: React.ReactNode
}

export const TOOL_PANELS: ToolPanel[] = [
    {
        label: 'Upload',
        component: <UploadToolPanel />,
    },
    {
        label: 'Text',
        component: <TextToolPanel />,
    },
    {
        label: 'Assets',
        component: <AssetsToolPanel />,
    },
    {
        label: 'Stickers',
        component: <StickersToolPanel />,
    },
    {
        label: 'Voiceover',
        component: <VoiceoverToolPanel />,
    },
    {
        label: 'Captions',
        component: <CaptionsToolPanel />,
    },
    {
        label: 'Animations',
        component: <AnimationsToolPanel />,
    },
    {
        label: 'Filters',
        component: <FiltersToolPanel />,
    },
]

export interface TextOverlay {
    font: string
    fontSize: number
    boldness: string
    uppercase: boolean
    textColor: string
    backgroundColor: string | null
    strokeColor: string | null
    shadow: string | null
    label: string
}

export const TEXT_OVERLAYS: TextOverlay[] = [
    {
        font: "Monserrat",
        fontSize: 60,
        boldness: "Bold",
        uppercase: false,
        textColor: "Black",
        backgroundColor: null,
        strokeColor: null,
        shadow: null,
        label: "Montserrat Basic"
    },
    {
        font: "PT-Serif",
        fontSize: 60,
        boldness: "Bold",
        uppercase: false,
        textColor: "Black",
        backgroundColor: "Yellow",
        strokeColor: null,
        shadow: "Small",
        label: "PT-Serif Highlight"
    },
    {
        font: "Poppins",
        fontSize: 60,
        boldness: "Bold",
        uppercase: false,
        textColor: "White",
        backgroundColor: null,
        strokeColor: "Black",
        shadow: "Small",
        label: "Poppins Light"
    },
    {
        font: "Open Sans",
        fontSize: 60,
        boldness: "Bold",
        uppercase: true,
        textColor: "White",
        backgroundColor: "Black",
        strokeColor: null,
        shadow: null,
        label: "Open Sans Bold"
    },
    {
        font: "Open Sans",
        fontSize: 40,
        boldness: "Medium",
        uppercase: false,
        textColor: "Black",
        backgroundColor: "White",
        strokeColor: null,
        shadow: null,
        label: "Open Sans Medium"
    },
    {
        font: "Oswald",
        fontSize: 60,
        boldness: "Bold",
        uppercase: true,
        textColor: "Yellow",
        backgroundColor: "Black",
        strokeColor: null,
        shadow: null,
        label: "Oswald Impact"
    },
    {
        font: "Roboto",
        fontSize: 40,
        boldness: "Medium",
        uppercase: false,
        textColor: "Yellow",
        backgroundColor: null,
        strokeColor: "Black",
        shadow: "Small",
        label: "Roboto Accent"
    },
    {
        font: "Montserrat",
        fontSize: 60,
        boldness: "Bold",
        uppercase: true,
        textColor: "Red",
        backgroundColor: null,
        strokeColor: "Black",
        shadow: "Small",
        label: "Montserrat Alert"
    }
];

interface CaptionStyle {
    font: string
    boldness: string
    uppercase: boolean
    strokeThickness: string
    strokeColor: string
    shadow: string
    mainTextColor: string
    highlightColors: string[]
    captionPerPage: number
    animation: string
    label: string
}

export const CAPTION_STYLES: CaptionStyle[] = [
    {
        font: "Fira Sans Condensed",
        boldness: "Heavy",
        uppercase: true,
        strokeThickness: "Medium",
        strokeColor: "Black",
        shadow: "Medium",
        mainTextColor: "White",
        highlightColors: ["#2BF82A", "#FDFA14", "#F01916"],
        captionPerPage: 3,
        animation: "Bounce",
        label: "Fira Sans Bold"
    },
    {
        font: "Komika-axis",
        boldness: "Heavy",
        uppercase: true,
        strokeThickness: "Medium",
        strokeColor: "Black",
        shadow: "Small",
        mainTextColor: "White",
        highlightColors: ["#44FF00", "#FF0006"],
        captionPerPage: 3,
        animation: "Pop",
        label: "Comic Style"
    },
    {
        font: "Circular",
        boldness: "Medium",
        uppercase: false,
        strokeThickness: "Medium",
        strokeColor: "Black",
        shadow: "Small",
        mainTextColor: "White",
        highlightColors: ["#66FFDD", "#FFCC00", "#AAFF66"],
        captionPerPage: 1,
        animation: "None",
        label: "Circular Clean"
    },
    {
        font: "Poppins",
        boldness: "Bold",
        uppercase: false,
        strokeThickness: "Small",
        strokeColor: "Black",
        shadow: "None",
        mainTextColor: "White",
        highlightColors: ["#44FF00", "#FFDD55", "#33FFCC"],
        captionPerPage: 1,
        animation: "None",
        label: "Poppins Simple"
    },
    {
        font: "Roboto",
        boldness: "Heavy",
        uppercase: true,
        strokeThickness: "Medium",
        strokeColor: "Black",
        shadow: "Small",
        mainTextColor: "White",
        highlightColors: ["#E3417C"],
        captionPerPage: 1,
        animation: "Bounce",
        label: "Roboto Impact"
    },
    {
        font: "Montserrat",
        boldness: "Bold",
        uppercase: true,
        strokeThickness: "Medium",
        strokeColor: "None",
        shadow: "None",
        mainTextColor: "White",
        highlightColors: [],
        captionPerPage: 1,
        animation: "Pop",
        label: "Montserrat Clean"
    },
    {
        font: "Montserrat",
        boldness: "Bold",
        uppercase: false,
        strokeThickness: "Medium",
        strokeColor: "Black",
        shadow: "None",
        mainTextColor: "White",
        highlightColors: [],
        captionPerPage: 1,
        animation: "None",
        label: "Montserrat Basic"
    },
    {
        font: "Bold Slay",
        boldness: "Bold",
        uppercase: false,
        strokeThickness: "Small",
        strokeColor: "Black",
        shadow: "Small",
        mainTextColor: "White",
        highlightColors: ["#2BF82A", "#FDFA14", "#F01916"],
        captionPerPage: 3,
        animation: "Pop / Boxing keyword",
        label: "Bold Slay Highlight"
    }
];

interface Transition {
    label: string
}

export const TRANSITIONS: Transition[] = [
    {
        label: "Cross Fade",
    },
    {
        label: "Cross Zoom",
    },
    {
        label: "Zoom In",
    },
    {
        label: "Zoom Out",
    },
    {
        label: "Fade In",
    },
    {
        label: "Fade Out",
    }
]