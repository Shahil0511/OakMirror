import { useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "../../components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

interface PostFormValues {
    title: string;
    content: string;
    postType: "general" | "question" | "review" | "news";
    industry?: string;
    company?: string;
    jobTitle?: string;
    location?: string;
    tags?: string[];
}

interface CreatePostFormProps {
    onClose: () => void;
    onSubmit?: (title: string, content: string) => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onClose }) => {
    const [newTag, setNewTag] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const token = useSelector((state: RootState) => state.auth.accessToken); // Moved to component level

    const form = useForm<PostFormValues>({
        defaultValues: {
            title: "",
            content: "",
            postType: "general",
            tags: [],
        },
    });

    const addTag = () => {
        if (newTag && !tags.includes(newTag)) {
            const updatedTags = [...tags, newTag];
            setTags(updatedTags);
            form.setValue("tags", updatedTags);
            setNewTag("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        const updatedTags = tags.filter(tag => tag !== tagToRemove);
        setTags(updatedTags);
        form.setValue("tags", updatedTags);
    };

    const handleSubmit = async (values: PostFormValues) => {
        try {
            console.log("Form submitted:", values);

            const response = await fetch('http://localhost:4000/api/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Error:', data.message);
                alert('Post creation failed: ' + data.message);
                return;
            }

            console.log('Post created successfully:', data);
            alert('Post created!');
            onClose(); // Close the form after successful submission
        } catch (error) {
            console.error('Submission error:', error);
            alert('Something went wrong while submitting the post');
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 p-6 shadow-lg w-full max-w-3xl relative z-50">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Create New Post
                </h2>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                    <X className="h-5 w-5" />
                </Button>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Post title"
                                        className="min-h-[40px]"
                                        value={field.value || ""}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="postType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Post Type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue="general"
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select post type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="general">General Discussion</SelectItem>
                                            <SelectItem value="question">Question</SelectItem>
                                            <SelectItem value="review">Company Review</SelectItem>
                                            <SelectItem value="news">Industry News</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="industry"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Industry</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="e.g. Technology, Finance"
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Company name"
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="jobTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Role</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="e.g. Software Engineer"
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="e.g. San Francisco"
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Post Content</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Share your thoughts..."
                                        className="min-h-[200px]"
                                        value={field.value || ""}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div className="space-y-2">
                        <Label>Tags</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {tags.map(tag => (
                                <Badge key={tag} variant="outline" className="flex items-center gap-1">
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="ml-1 text-gray-500 hover:text-gray-700"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Input
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                placeholder="Add tags (press Enter)"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        addTag();
                                    }
                                }}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={addTag}
                                disabled={!newTag}
                            >
                                Add
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="px-6"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="px-6 bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? "Publishing..." : "Publish Post"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CreatePostForm;