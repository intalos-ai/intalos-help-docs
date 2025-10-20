# GoogleDrive Component - User Guide

## Overview

The **GoogleDrive** component allows you to upload files received from users directly to your Google Drive. Perfect for storing user-submitted photos, documents, and files in an organized, cloud-based location.

## When to Use GoogleDrive

Ideal for scenarios like:
- Archiving user-submitted documents
- Storing product photos from customers
- Organizing form attachments
- Backing up important files
- Creating searchable file repositories
- Integrating with Google Workspace workflows

---

## Setup Requirements

### Before You Start

1. **Google Account**: You need a Google account with Google Drive access
2. **Google Drive Folder**: Create a folder where files will be uploaded
3. **Authorization**: Grant Intalos access to your Google Drive
4. **QuestionMedia Component**: Must be placed before GoogleDrive to receive files

---

## Configuration

### Step 1: Connect Google Account

1. Click **"Login with Google"** in the component
2. Authorize Intalos AI Bot Builder
3. Grant permissions to access Google Drive
4. Select your Google account

### Step 2: Select Upload Folder

1. Click **"Select Folder"** button
2. Browse your Google Drive folders
3. Select destination folder for uploads
4. Component saves folder selection

### Step 3: Configure File Storage

#### Store File URL

The Google Drive file URL will be saved to a variable:

1. In **"Store file URL in variable"**, enter variable name:
   ```
   Example: uploadedFileUrl
   Example: documentLink
   Example: userPhotoUrl
   ```

2. Use this URL later to:
   - Send to your team via Email
   - Store in database via APIRequest
   - Display to users
   - Reference in other systems

---

## Image Safety Check (Optional)

Automatically validate uploaded images for inappropriate content using Google Cloud Vision API.

### When to Enable

**Use when**:
- Accepting user-generated images
- Public-facing applications
- Community guidelines enforcement
- Content moderation required
- Child-safe applications

**Skip when**:
- Only accepting documents
- Trusted user base
- Internal applications
- Cost is a concern

### Setup

1. Toggle **"Enable Image Safety Check"** to ON
2. Get API key from Google Cloud Console:
   - Visit: https://console.cloud.google.com/
   - Enable Cloud Vision API
   - Create API key
   - Copy the key
3. Paste API key in component
4. Click "Apply Changes"

### What It Checks

The system checks for:
- Adult content
- Violence
- Racy/suggestive content
- Medical/graphic images
- Spoofed/manipulated content

### What Happens

**Image passes**:
- File uploaded to Google Drive
- URL stored in variable
- Flow continues

**Image fails**:
- File NOT uploaded
- User notified (customizable message)
- Flow routes to error port
- Admin notified (if enabled)

---

## How It Works

### Upload Process

1. **User sends file** via WhatsApp (in QuestionMedia component)
2. **File received** by bot
3. **Safety check** (if enabled and file is image)
4. **Upload to Drive** in selected folder
5. **URL generated** and stored in variable
6. **Flow continues** to next component

### File Organization

**In your Google Drive**:
```
Selected Folder/
|--─ user_file_1.pdf
|--─ user_photo_2.jpg
|--─ document_3.pdf
\--─ ... (all uploaded files)
```

**File naming**:
- Original filename preserved
- Duplicate names handled automatically
- Organized by upload date

---

## Use Cases & Examples

### 1. Document Collection

**Flow**:
```
QuestionMedia (collect PDF)
-> GoogleDrive (upload to "Customer Documents" folder)
   -> Store URL in {documentUrl}
      -> Email (send {documentUrl} to team)
         -> Confirmation to user
```

### 2. ID Verification

**Flow**:
```
QuestionMedia (collect ID photo)
-> GoogleDrive (with safety check)
   |-- Success -> Upload to "ID Verifications" folder
   │            -> Store in {idPhotoUrl}
   │               -> APIRequest (send to verification service)
   \-- Safety check failed -> "Please upload a clear photo of your ID"
```

### 3. Product Photo Collection

**Flow**:
```
QuestionMedia (collect product photo)
-> GoogleDrive (with safety check, upload to "Product Photos")
   -> Store in {productPhotoUrl}
      -> GoogleSheets (insert row with {productPhotoUrl})
         -> "Thank you! Photo received."
```

### 4. Support Ticket Attachments

**Flow**:
```
QuestionMedia (collect screenshot)
-> GoogleDrive (upload to "Support Attachments/{ticketId}")
   -> Store in {attachmentUrl}
      -> Email (notify support with {attachmentUrl})
```

---

## Best Practices

### Folder Organization

**DO**:
- Create dedicated folders for different file types
- Use descriptive folder names
- Organize by date or category
- Keep folder structure simple

**DON'T**:
- Upload all files to root Drive
- Use complex nested structures
- Mix different file types in one folder
- Create too many sub-folders

### Safety Checks

**DO**:
- Enable for user-generated content
- Set up error handling
- Inform users about content policies
- Test with various images

**DON'T**:
- Skip safety checks for public apps
- Enable for non-image files (unnecessary cost)
- Forget to handle rejection scenarios

### Variable Usage

**DO**:
- Store URLs in descriptive variables
- Use URLs in subsequent components
- Test URL access
- Consider URL expiration policies

**DON'T**:
- Forget to store URLs
- Use generic variable names
- Assume URLs are permanent

---

## Integration Patterns

### QuestionMedia + GoogleDrive

**Standard pattern**:
```
QuestionMedia (collect file from user)
-> GoogleDrive (upload to Drive folder)
   -> Success -> File uploaded
   -> Error -> Upload failed
```

### With Notification

```
QuestionMedia
-> GoogleDrive
   -> Email (notify team with file URL)
      -> Confirmation message to user
```

### With Database Storage

```
QuestionMedia
-> GoogleDrive
   -> APIRequest (save {fileUrl} to database)
      -> GoogleSheets (log submission)
```

---

## Error Handling

### Error Output Port

Route the conversation when upload fails:

1. Toggle **"Error Output Port"** to ON
2. Connect the error arrow to your error handling flow
3. Handle scenarios like:
    - Authentication failures
    - Permission denied
    - Folder not found
    - Safety check failures
    - Network errors
    - Quota exceeded

### Error Message to User

Send a custom message when errors occur:

1. Toggle **"Error Message to User"** to ON
2. Enter your message:
   ```
   Sorry, we couldn't upload your file. Please try again or contact support.
   ```

**For safety check failures**:
```
Your image didn't pass our content guidelines. Please upload an appropriate image.
```

### Admin Email Notification

Get notified when errors occur:

1. Toggle **"Admin email when error"** to ON
2. Notifications include:
   - Error type
   - File information
   - User details
   - Timestamp

---

## Technical Details

### File Upload

- **Method**: Google Drive API v3
- **Authentication**: OAuth 2.0
- **Transfer**: Direct upload to Drive
- **Processing**: Asynchronous
- **Timeout**: 60 seconds

### Supported File Types

**All types supported by QuestionMedia**:
- Images (JPEG, PNG, GIF)
- Videos (MP4, MOV)
- Audio (MP3, WAV, OGG, Opus, WebM)
- Documents (PDF)

### File Size Limits

Limits are the same as QuestionMedia:
- Images: 10 MB
- Videos: 10 MB
- Audio: 10 MB
- PDFs: 2 MB

### Permissions Required

Google Drive authorization needs:
- **drive.file**: Create and access files created by the app
- **drive.readonly** (for folder browsing): Read file metadata

---

## Google Cloud Vision API

### Safety Check Details

**Categories checked**:
| Category | Allowed Levels | Blocks |
|----------|---------------|---------|
| Adult | VERY_UNLIKELY, UNLIKELY, POSSIBLE | LIKELY, VERY_LIKELY |
| Violence | VERY_UNLIKELY, UNLIKELY, POSSIBLE | LIKELY, VERY_LIKELY |
| Racy | VERY_UNLIKELY, UNLIKELY | POSSIBLE, LIKELY, VERY_LIKELY |
| Medical | VERY_UNLIKELY, UNLIKELY, POSSIBLE | LIKELY, VERY_LIKELY |
| Spoof | All allowed | None |

### API Costs

- **Per image**: ~$1.50 per 1,000 images
- **First 1,000**: Free per month
- **Billing**: Through Google Cloud account

### Setup Vision API

1. Visit Google Cloud Console
2. Enable Cloud Vision API
3. Create API key (or use service account)
4. Copy key to component
5. Monitor usage in console

---

## Security & Privacy

### Access Control

**DO**:
- Use dedicated folder for bot uploads
- Set appropriate folder permissions
- Regularly audit uploaded files
- Remove unnecessary files periodically

**DON'T**:
- Upload to shared/public folders
- Give unlimited access
- Store sensitive data without encryption
- Mix user files with system files

### File Privacy

- **Folder permissions**: Control in Google Drive
- **File visibility**: Inherited from folder
- **Sharing**: Manage per file or folder
- **URLs**: Google Drive URLs are private by default

---

## Troubleshooting

### Issue: "Authentication failed"

**Check**:
- Google account is still authorized
- OAuth token hasn't expired
- Permissions weren't revoked

**Solution**:
- Re-authorize Google account
- Click "Login with Google" again
- Check account has Drive access

### Issue: "Permission denied"

**Check**:
- You have write access to selected folder
- Folder still exists
- Folder wasn't deleted or moved

**Solution**:
- Verify folder permissions
- Re-select folder
- Create new folder if needed

### Issue: "Safety check failed"

**Check**:
- API key is valid
- Cloud Vision API is enabled
- Billing is set up in Google Cloud
- Image actually violates policies

**Solution**:
- Verify API key
- Enable Cloud Vision API
- Check billing status
- Review image content

### Issue: Files not appearing in Drive

**Check**:
- Folder ID is correct
- Upload actually succeeded
- You're looking in the right folder
- Refresh Google Drive view

**Solution**:
- Check flow execution logs
- Verify success path was taken
- Re-select folder in component

### Issue: "Quota exceeded"

**Cause**:
- Google Drive storage full
- API rate limit reached

**Solution**:
- Free up Drive storage
- Wait for rate limit reset (usually 1 minute)
- Upgrade Drive storage if needed

---

## Advanced Patterns

### Organized File Structure

Create dynamic folder structure:
```
Main Folder/
|--─ 2025-01-15/
│   |--─ user_file_1.pdf
│   \--─ user_file_2.jpg
\--─ 2025-01-16/
    \--─ user_file_3.pdf
```

(Requires CustomCode or APIRequest to create date folders)

### File Processing Pipeline

```
QuestionMedia (collect image)
-> GoogleDrive (upload, safety check)
   -> Success -> GoogleSheets (log file URL)
              -> Email (notify team)
                 -> Confirmation to user
```

### Multi-File Collection

```
QuestionMedia (file 1) -> GoogleDrive (upload)
-> QuestionMedia (file 2) -> GoogleDrive (upload)
   -> QuestionMedia (file 3) -> GoogleDrive (upload)
      -> All files collected confirmation
```

---

## Common Patterns

### Document Submission

```
Collect user info
-> QuestionMedia (collect document)
   -> GoogleDrive (upload to "Submissions")
      -> GoogleSheets (log submission with {fileUrl})
         -> Email (notify admin)
            -> "Thank you, received!"
```

### Photo Album

```
QuestionMedia (collect photo)
-> GoogleDrive (upload to "User Photos", safety check ON)
   -> Success -> "Photo added to album!"
   -> Safety fail -> "Please upload appropriate image"
```

---

## Need Help?

Email: contact@intalos.de

---

**Last Updated**: October 20, 2025

