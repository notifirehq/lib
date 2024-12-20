import { Cross2Icon } from '@radix-ui/react-icons';
import { RiEdit2Line, RiPencilRuler2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import { Notification5Fill } from '@/components/icons';
import { Button } from '@/components/primitives/button';
import { Separator } from '@/components/primitives/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/primitives/tabs';

interface TemplateTabsProps {
  editorContent: React.ReactNode;
  previewContent?: React.ReactNode;
  tabsValue: string;
  onTabChange: (tab: string) => void;
}

export const TemplateTabs = ({ editorContent, previewContent, tabsValue, onTabChange }: TemplateTabsProps) => {
  const navigate = useNavigate();

  return (
    <Tabs defaultValue="editor" value={tabsValue} onValueChange={onTabChange} className="flex h-full flex-1 flex-col">
      <header className="flex flex-row items-center gap-3 px-3 py-1.5">
        <div className="mr-auto flex items-center gap-2.5 text-sm font-medium">
          <RiEdit2Line className="size-4" />
          <span>Configure Template</span>
        </div>
        <TabsList className="w-min">
          <TabsTrigger value="editor" className="gap-1.5">
            <RiPencilRuler2Line className="size-5 p-0.5" />
            <span>Editor</span>
          </TabsTrigger>
          <TabsTrigger value="preview" className="gap-1.5" disabled={!previewContent}>
            <Notification5Fill className="size-5 p-0.5" />
            <span>Preview</span>
          </TabsTrigger>
        </TabsList>

        <Button
          variant="ghost"
          size="xs"
          className="size-6"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate('../', { relative: 'path' });
          }}
        >
          <Cross2Icon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </header>
      <Separator />
      <TabsContent value="editor" className="h-full w-full overflow-y-auto">
        {editorContent}
      </TabsContent>
      <TabsContent value="preview" className="h-full w-full overflow-y-auto">
        {previewContent}
      </TabsContent>
      <Separator />
    </Tabs>
  );
};
