# QuestionMedia Component

## Overview

The **QuestionMedia** component allows you to receive and process media files uploaded by your users via WhatsApp. Perfect for collecting photos, documents, voice messages, and videos from your customers.

**📸 Single File Upload**: Users can upload one file at a time. The file URL is stored as a string in your variable.

## When to Use QuestionMedia

Ideal for scenarios like:
- Collecting product photos or damage reports
- Receiving signed documents or forms
- Getting voice messages from customers
- ID verification and document submission
- Property photos for real estate
- Service request images

---

## How It Works

### User Experience

1. **Bot asks**: "Please upload your invoice"
2. **User**: Taps attachment icon in WhatsApp
3. **User**: Selects and sends one or multiple files
4. **QuestionMedia**: Receives and processes all files simultaneously
5. **Result**: Files are validated, saved, and URL(s) stored in variable

### Behind the Scenes

1. File is downloaded from WhatsApp
2. Type and size are validated
3. Image safety check (optional, for images)
4. File uploaded to secure cloud storage
5. S3 key (file location) stored in your variable

---

## Single File Upload

### How It Works

Users can upload one file at a time from WhatsApp:

**Variable storage:**
- **File URL** -> String: `"uploads/question_media/permanent/bot_66_comp_xyz_a1b2c3d4.jpg"`

**Important**: Only the first file received will be processed. If a user sends multiple files, only the first one will be accepted, and the user will receive a notification that additional files were ignored.

**Example:**
```
User sends: 3 photos at once
Result: First photo processed and stored
Notification: "⚠️ Please upload only ONE file at a time. One of your files was received successfully. Additional files have been ignored."
```

---

## File Size Limits

**Important size restrictions**:

| Media Type | Maximum Size | Why? |
|------------|--------------|------|
| **Images** | 10 MB | WhatsApp resizes large images |
| **Videos** | 10 MB | Faster processing |
| **Audio** | 10 MB | Voice notes are typically small |
| **PDFs** | 2 MB | Quick processing response |

**Note**: These limits ensure fast processing and quick responses to users. WhatsApp requires bot responses within 200ms.

### What happens if file is too large?

**File upload:**
- User receives an error message
- Flow can branch to "error" path
- User can retry with a smaller file

**Need larger files?** Contact us at contact@intalos.de to discuss your use case.

---

## Image Safety Check (Optional)

### What is it?

Uses Google Cloud Vision API to automatically detect inappropriate content in uploaded images.

### When to use it?

- User-generated content platforms
- Public-facing submissions
- Apps with community guidelines
- Child-safe applications

### How to enable?

1. Toggle **"Enable Image Safety Check"** to ON
2. Enter your **Google Cloud Vision API Key**
3. Get an API key: [Google Cloud Console](https://console.cloud.google.com/)

### What does it check?

The system checks for:
- Adult content
- Violence
- Racy/suggestive content
- Medical/graphic images
- Spoofed/manipulated content

### What happens if image fails?

**Image safety check:**
- Image is rejected if it fails safety check
- User receives a notification
- File is NOT saved
- Flow branches to error path

**Example message**: "Image safety check alert - Image rejected due to adult content. Please try again."

---

## Advanced Configuration

### Error Handling

#### Error Output Port
1. Toggle **"Error Output Port"** to ON
2. Connect the error arrow to your error handling flow
3. Handle scenarios:
    - File too large
    - Wrong file type
    - Safety check failed
    - Network errors

#### Custom Error Message
1. Toggle **"Error Message to User"** to ON
2. Enter friendly message:
   ```
   Sorry, we couldn't process that file. Please try sending:
   - A different file
   - A smaller file (under 10 MB)
   - A PDF document
   ```

#### Admin Email Notification
1. Toggle **"Send Error Admin Email"** to ON
2. Get notified when errors occur
3. Review and troubleshoot issues

---

## Storage Modes

QuestionMedia offers two storage options for uploaded files:

### Temporary Storage

**Purpose**: Short-term file handling when you're sending the file to another system

**How it works**:
- Files stored on Intalos AI servers
- **Publicly accessible** via URL (no authentication required)
- **Automatically deleted after 24 hours**
- Does NOT count toward your storage quota
- Free to use

**Privacy**: Files are **publicly accessible**. Anyone with the URL can view the file. Use for non-sensitive data only.

**Best for**:
- Sending files to external APIs or services
- Files that will be stored elsewhere (AWS S3, your database, etc.)
- One-time processing or verification
- When you don't need long-term storage
- Files you'll send back to users via Media component

**Example use case**:
```
User uploads invoice PDF
-> Temporary storage (publicly accessible)
   -> APIRequest sends file to your accounting system
      -> File deleted after 24 hours
```

### Permanent Storage

**Purpose**: Long-term file storage within Intalos AI for use in your bot flows

**How it works**:
- Files stored in private Intalos AI storage
- **Private** (authentication required for access)
- **Stored indefinitely** until you delete them
- Counts toward your storage quota
- Can be accessed by bot components later

**Privacy**: Files are **private and secure**. Only your bot components (Media, APIRequest, Email) can access them with proper authentication. Use for sensitive documents.

**Best for**:
- Files you need to keep and reference in flows
- Building file libraries or archives
- Files used across multiple bot executions
- Long-term record keeping
- Sensitive documents requiring privacy

**Example use case**:
```
User uploads profile photo
-> Permanent storage (private)
   -> Used in future bot interactions
   -> Referenced in customer profile
   -> Kept indefinitely
```

### Choosing the Right Mode

**Use Temporary when**:
- Forwarding files to external systems
- Files are processed and discarded
- External system stores the file permanently
- You want to avoid storage costs

**Use Permanent when**:
- Files are part of your bot's data
- You'll reference the file in future flows
- Building a file repository
- Compliance or record-keeping requirements

---

## Accessing Uploaded Files

### File URL Format

After upload, the variable contains the S3 key:

**Temporary**:
```
uploads/question_media/temporary/bot_66_comp_xyz_a1b2c3d4.pdf
```

**Permanent**:
```
uploads/question_media/permanent/bot_66_comp_xyz_a1b2c3d4.pdf
```

### Using the File

**Important**: 
- **Temporary files**: Publicly accessible via URL - can be used anywhere
- **Permanent files**: Private - can only be accessed through bot components (Media, APIRequest, Email)

#### 1. Send to Your API
Use APIRequest component:
```json
{
  "customer_id": "{{customerID}}",
  "document_url": "{{uploadedDocument}}",
  "document_type": "invoice"
}
```

#### 2. Send to User (Media component)
Use Media component to send file back to user:
- Set Media Source to: `{uploadedDocument}`
- Works for both temporary and permanent files
- Bot components have authentication to access permanent files

#### 3. Email to Team
Use Email component:
```
New document uploaded by {customerName}
File location: {uploadedDocument}
```

#### 4. Store in GoogleSheets
Log file reference in a spreadsheet for tracking

---

## Common Use Cases

### 1. ID Verification

**Scenario**: Verify customer identity with ID card photo

**Configuration**:
- Media Type: `Image`
- Storage Mode: `Temporary` (deleted after 24 hours)
- Image Safety Check: `ON` (prevent inappropriate images)
- Store in: `idCardImage`

**Flow**:
```
Bot: "Please upload a photo of your ID card"
->
QuestionMedia receives image
->
Safety check validates content
->
APIRequest sends to verification service
->
Bot: "Thank you! Your ID is being verified"
```

---

### 2. Document Submission

**Scenario**: Collect signed contract from customer

**Configuration**:
- Media Type: `Document (pdf)`
- Storage Mode: `Permanent`
- Store in: `signedContract`

**Flow**:
```
Bot: "Please upload your signed contract"
->
QuestionMedia receives PDF
->
File validated (PDF, under 2 MB)
->
APIRequest stores in CRM
->
Email sent to legal team
->
Bot: "Contract received! We'll review and contact you."
```

---

### 3. Property Damage Report (Single Photo)

**Scenario**: Insurance claim with damage photo

**Configuration**:
- Media Type: `Image`
- Storage Mode: `Permanent`
- Store in: `damagePhoto`

**Flow**:
```
Bot: "Please send a photo of the damage"
-> QuestionMedia collects photo
-> Variable: "uploads/question_media/permanent/photo.jpg"
-> APIRequest creates claim
-> Bot: "Claim submitted! Reference: {claimNumber}"
```

---

### 4. Voice Feedback

**Scenario**: Customer voice feedback/complaints

**Configuration**:
- Media Type: `Audio`
- Storage Mode: `Permanent`
- Store in: `voiceFeedback`

**Flow**:
```
Bot: "Please record your feedback (voice note)"
->
QuestionMedia receives audio
->
File stored in feedback database
->
Email notification to customer service
->
Bot: "Thank you for your feedback!"
```

---

## Best Practices

### User Communication

**DO**:
- Clearly tell users what type of file to send
- Specify file size limits upfront
- Provide examples of good submissions
- Explain what you'll do with their file
- Confirm receipt immediately

**Example**:
```
Bot: "Please upload a clear photo of your receipt"
     Requirements:
     • JPEG or PNG format
     • Under 10 MB
     • All text clearly visible
```

**DON'T**:
- Assume users know what format to use
- Leave users wondering if upload succeeded
- Use technical error messages
- Ask for multiple files without clear instructions

### File Management

**DO**:
- Use temporary storage for sensitive documents
- Use permanent storage for records you need to keep
- Clean up old temporary files regularly (automatic after 24 hours)
- Track file uploads in your database
- Implement file retention policies

**DON'T**:
- Store everything permanently (costs)
- Keep sensitive data longer than needed
- Forget to handle file deletion requests
- Mix temporary and permanent use cases

### Security & Privacy

**DO**:
- Use image safety check for user-generated content
- Inform users about data retention policies
- Encrypt sensitive documents
- Limit access to uploaded files
- Comply with GDPR/data protection laws

**DON'T**:
- Store sensitive personal data without consent
- Share user files publicly
- Keep files indefinitely without reason
- Skip safety checks for public platforms

---

## Troubleshooting

### Issue: "File too large" error

**User receives**: "Media size limit breached"

**Solutions**:
1. Ask user to compress the image/video
2. Guide user to resize photo on their phone
3. For PDFs, ask to remove images or reduce quality
4. Consider upgrading limits (contact support)

**Prevention**:
```
Bot: "Please upload a photo (max 10 MB).
     Tip: Use your camera app's 'Share > Resize' option if the file is too large."
```

---

### Issue: Multiple files sent at once

**Message**: "⚠️ Please upload only ONE file at a time. One of your files was received successfully. Additional files have been ignored."

**Why**: Only one file can be processed at a time

**Solution**: Ask users to send files one at a time, or use multiple QuestionMedia components in sequence if you need multiple files

---

### Issue: Wrong file type uploaded

**User uploads**: Word document instead of PDF

**Solutions**:
1. Clear error message explaining required format
2. Provide conversion instructions
3. Link to online PDF converter
4. Allow retry

**Example response**:
```
Bot: "Please upload a PDF file.
     If you have a Word document, you can:
     1. Open the document
     2. Select 'Save As'
     3. Choose 'PDF' format
     Then send it again."
```

---

### Issue: Image safety check fails

**Reason**: Image contains flagged content

**Solutions**:
1. Ask user to upload different image
2. Explain why image was rejected (tactfully)
3. Provide guidelines for acceptable images

**Example response**:
```
Bot: "We couldn't process that image. Please upload a clear photo of the item/document without any other content."
```

---

### Issue: User confused about what to upload

**Prevention**: Crystal clear instructions

**Good examples**:
```
**Bad**: "Send document"
**Good**: "Please upload a PDF copy of your signed contract"

**Bad**: "Upload image"
**Good**: "Please send a clear photo of the product with the serial number visible"

**Bad**: "Voice note"
**Good**: "Please record a voice message (up to 1 minute) describing the issue"
```

---

### Issue: Files not accessible later

**Reason**: S3 key incorrect or file deleted

**Solutions**:
1. Verify S3 key is stored correctly in variable
2. Check storage mode (temporary files are deleted after 24 hours)
3. Ensure your backend has S3 access permissions
4. Use presigned URLs for temporary public access

---

## Technical Details

### File Processing Flow

```
1. User sends file via WhatsApp
   ->
2. WhatsApp generates media ID
   ->
3. Bot retrieves file from WhatsApp servers
   ->
4. File validated (type, size, MIME)
   ->
5. Optional: Google Vision safety check (images)
   ->
6. File uploaded to private S3 bucket
   ->
7. S3 key stored in variable
   ->
8. Flow continues
```

### File Storage Structure

**Temporary files**:
```
uploads/question_media/temporary/{botId}_{componentId}_{uuid}.{ext}
```
Deleted automatically after 24 hours.

**Permanent files**:
```
uploads/question_media/permanent/{botId}_{componentId}_{uuid}.{ext}
```
Stored indefinitely (counts toward quota).

### Supported MIME Types

**Images**:
- `image/jpeg`
- `image/png`
- `image/gif`

**Videos**:
- `video/mp4`
- `video/quicktime`

**Audio**:
- `audio/mpeg` (MP3)
- `audio/wav`
- `audio/ogg`
- `audio/opus`
- `audio/webm`

**Documents**:
- `application/pdf` only

### Security Features

- Files stored in private S3 bucket (not publicly accessible)
- Unique UUIDs prevent file name collisions
- MIME type validation prevents file type spoofing
- Size limits prevent abuse
- Optional content safety checks
- Automatic cleanup of temporary files

---

## Cost Considerations

### Storage Costs

- **Temporary storage**: Free (deleted after 24 hours)
- **Permanent storage**: Counts toward your storage quota
- **Quota tracking**: Monitor in your dashboard

### Bandwidth Costs

- Downloads from WhatsApp: No charge to you
- Uploads to S3: Included in platform costs
- Large file uploads: More processing time

### API Costs

- **Google Vision API**: Separate billing by Google
  - First 1,000 images/month: Free
  - After: Pay per image
  - [Pricing details](https://cloud.google.com/vision/pricing)

---

## Compliance & Privacy

### GDPR Considerations

- ✅ Users have right to request file deletion
- ✅ Inform users about data retention
- ✅ Implement data retention policies
- ✅ Provide data export capabilities

### Data Retention

**Recommendations**:
- **ID verification**: Temporary storage (auto-delete 24 hours)
- **Contracts**: Permanent storage (legal requirement)
- **Support tickets**: 90-day retention, then delete
- **General submissions**: Based on your privacy policy

---

## Tips for Success

1. **Clear Instructions**: Tell users exactly what to upload
2. **Visual Examples**: In your bot flow, show example of good upload
3. **Immediate Feedback**: Confirm receipt and next steps
4. **Error Recovery**: Allow users to retry easily
5. **Privacy First**: Use appropriate storage duration
6. **Test Thoroughly**: Upload different file types and sizes during testing

---

## Need Help?

Email: contact@intalos.de

---

**Last Updated**: January 2025


