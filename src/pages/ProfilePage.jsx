import React, { useState } from "react";
import { Camera, Mail, Calendar, Shield } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Avatar from "../components/ui/Avatar";
import Badge from "../components/ui/Badge";
import Separator from "../components/ui/Separator";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image must be smaller than 4MB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePicture: base64Image });
      toast.success("Profile picture updated!");
    };
  };

  const formatDate = (isoDateString) => {
    if (!isoDateString) return "";
    const date = new Date(isoDateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const memberSinceDate = formatDate(authUser?.createdAt);

  return (
    <div className="min-h-screen bg-surface-primary p-4 lg:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Profile</h1>
          <p className="text-text-secondary mt-1">Manage your account information</p>
        </div>

        {/* Profile Picture Card */}
        <Card padding="lg" className="text-center">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <Avatar
                  src={selectedImg || authUser?.profilePicture}
                  alt={authUser?.fullName}
                  size="2xl"
                  initials={authUser?.fullName.charAt(0)}
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-white hover:bg-blue-600 transition-all cursor-pointer shadow-lg"
                  title="Update profile picture"
                >
                  <Camera className="h-5 w-5" />
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary">
                {authUser?.fullName}
              </h2>
              <p className="text-text-secondary text-sm mt-1">
                {isUpdatingProfile ? "Updating profile..." : "Update your picture to personalize your account"}
              </p>
            </div>
          </div>
        </Card>

        {/* Account Information */}
        <Card padding="lg">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Account Information
          </h3>

          <Separator className="mb-6" />

          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary-light flex-shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-secondary">
                  Email Address
                </p>
                <p className="text-text-primary font-mono text-sm mt-1 break-all">
                  {authUser?.email}
                </p>
              </div>
            </div>

            {/* Member Since */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-secondary-light flex-shrink-0">
                <Calendar className="h-5 w-5 text-secondary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-secondary">
                  Member Since
                </p>
                <p className="text-text-primary mt-1">{memberSinceDate}</p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-success-light flex-shrink-0">
                <Shield className="h-5 w-5 text-success" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-secondary">
                  Account Status
                </p>
                <div className="mt-1">
                  <Badge variant="success">Active</Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Bio Section */}
        {authUser?.bio && (
          <Card padding="lg">
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              Bio
            </h3>
            <p className="text-text-secondary leading-relaxed">{authUser.bio}</p>
          </Card>
        )}

        {/* Account Settings Info */}
        <Card padding="lg" className="bg-info-light border border-info">
          <h4 className="font-semibold text-text-primary mb-2">
            Account Settings
          </h4>
          <p className="text-text-secondary text-sm">
            Need to change your password or other settings? Visit the{" "}
            <a href="/settings" className="text-primary font-medium hover:underline">
              Settings
            </a>{" "}
            page.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;