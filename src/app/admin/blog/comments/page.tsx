"use client";

import { useState, useEffect } from "react";
import { SidebarTrigger } from "@/src/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import { Badge } from "@/src/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { MessageSquare, Check, X, Trash2, Loader2, Eye } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import Link from "next/link";

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  approved: boolean;
  createdAt: Date;
  post: {
    id: string;
    title: string;
    slug: string;
  };
}

export default function BlogCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/blog/comments");
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/blog/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: true }),
      });

      if (response.ok) {
        toast.success("Comment approved");
        fetchComments();
      } else {
        toast.error("Failed to approve comment");
      }
    } catch (error) {
      console.error("Error approving comment:", error);
      toast.error("Failed to approve comment");
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/blog/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: false }),
      });

      if (response.ok) {
        toast.success("Comment rejected");
        fetchComments();
      } else {
        toast.error("Failed to reject comment");
      }
    } catch (error) {
      console.error("Error rejecting comment:", error);
      toast.error("Failed to reject comment");
    }
  };

  const handleDeleteClick = (comment: Comment) => {
    setSelectedComment(comment);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedComment) return;

    try {
      setDeleting(true);
      const response = await fetch(
        `/api/admin/blog/comments/${selectedComment.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Comment deleted successfully");
        setIsDeleteDialogOpen(false);
        setSelectedComment(null);
        fetchComments();
      } else {
        toast.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment");
    } finally {
      setDeleting(false);
    }
  };

  const pendingComments = comments.filter((c) => !c.approved);
  const approvedComments = comments.filter((c) => c.approved);

  const renderCommentTable = (commentsList: Comment[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Author</TableHead>
          <TableHead>Comment</TableHead>
          <TableHead>Post</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {commentsList.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">No comments found</p>
            </TableCell>
          </TableRow>
        ) : (
          commentsList.map((comment) => (
            <TableRow key={comment.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{comment.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {comment.email}
                  </p>
                </div>
              </TableCell>
              <TableCell className="max-w-md">
                <p className="line-clamp-2 text-sm">{comment.content}</p>
              </TableCell>
              <TableCell>
                <Link
                  href={`/blog/${comment.post.slug}`}
                  target="_blank"
                  className="text-sm text-primary hover:underline line-clamp-1"
                >
                  {comment.post.title}
                </Link>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {format(new Date(comment.createdAt), "MMM d, yyyy")}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm" asChild className="gap-2">
                    <Link href={`/blog/${comment.post.slug}`} target="_blank">
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  {!comment.approved ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleApprove(comment.id)}
                      className="gap-2 text-green-600 hover:text-green-700"
                    >
                      <Check className="h-4 w-4" />
                      Approve
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReject(comment.id)}
                      className="gap-2 text-orange-600 hover:text-orange-700"
                    >
                      <X className="h-4 w-4" />
                      Unapprove
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClick(comment)}
                    className="gap-2 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Blog Comments</h1>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 overflow-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Comment Management
            </CardTitle>
            <CardDescription>
              Approve, reject, or delete blog comments
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="pending">
                    Pending ({pendingComments.length})
                  </TabsTrigger>
                  <TabsTrigger value="approved">
                    Approved ({approvedComments.length})
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="pending" className="mt-6">
                  {renderCommentTable(pendingComments)}
                </TabsContent>
                <TabsContent value="approved" className="mt-6">
                  {renderCommentTable(approvedComments)}
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the comment from{" "}
              {selectedComment?.author}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
