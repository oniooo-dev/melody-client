import UploadToolPanel from "@/components/editor/tools/UploadToolPanel"
import TextToolPanel from "@/components/editor/tools/TextToolPanel"
import AssetsToolPanel from "@/components/editor/tools/AssetsToolPanel"
import VoiceoverToolPanel from "@/components/editor/tools/VoiceoverToolPanel"
import CaptionToolPanel from "@/components/editor/tools/CaptionToolPanel"
import MusicToolPanel from "@/components/editor/tools/MusicToolPanel"
import TransitionToolPanel from "@/components/editor/tools/TransitionToolPanel"

interface Tool {
    label: string
    icon: string
}

export const TOOLS: Tool[] = [
    {
        label: 'Upload',
        icon: '/assets/editor/icons/upload.png',
    },
    {
        label: 'Text',
        icon: '/assets/editor/icons/text.png',
    },
    {
        label: 'Assets',
        icon: '/assets/editor/icons/assets.png',
    },
    {
        label: 'Voiceover',
        icon: '/assets/editor/icons/voiceover.png',
    },
    {
        label: 'Captions',
        icon: '/assets/editor/icons/captions.png',
    },
    {
        label: 'Music',
        icon: '/assets/editor/icons/music.png',
    },
    {
        label: 'Transitions',
        icon: '/assets/editor/icons/transitions.png',
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
        label: 'Voiceover',
        component: <VoiceoverToolPanel />,
    },
    {
        label: 'Captions',
        component: <CaptionToolPanel />,
    },
    {
        label: 'Music',
        component: <MusicToolPanel />,
    },
    {
        label: 'Transitions',
        component: <TransitionToolPanel />,
    },
]