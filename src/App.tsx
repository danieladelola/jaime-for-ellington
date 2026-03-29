import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import MeetJamie from "./pages/MeetJamie";
import Priorities from "./pages/Priorities";
import Contact from "./pages/Contact";
import Voting from "./pages/Voting";
import Volunteer from "./pages/Volunteer";
import Blog from "./pages/Blog";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminContacts from "./pages/admin/AdminContacts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/meet-jamie" element={<MeetJamie />} />
            <Route path="/priorities" element={<Priorities />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/voting" element={<Voting />} />
            <Route path="/volunteer" element={<Volunteer />} />
          </Route>
          <Route path="/admin" element={<AdminLogin />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/blogs" element={<AdminBlogs />} />
            <Route path="/admin/contacts" element={<AdminContacts />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
