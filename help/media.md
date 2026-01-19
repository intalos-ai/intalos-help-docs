# Media Component

## Overview

The **Media** component allows you to send images, videos, audio files, and PDF documents to your WhatsApp bot users. Perfect for sharing promotional content, documents, tutorials, and multimedia experiences.

## When to Use Media

Ideal for scenarios like:
- Sending product images or catalogs
- Sharing PDF documents (invoices, contracts, guides)
- Delivering video tutorials or demonstrations
- Sending audio messages or voice recordings
- Sharing promotional graphics or infographics

---

## Input Modes

### Static Mode

**Best for**: Files that don't change, promotional content, standard documents

**How it works**:
1. Upload your file once during bot setup
2. File is stored securely on our servers
3. Same file is sent to all users

**Example Use Cases**:
- Company logo
- Product catalog PDF
- Welcome video
- Terms and conditions document

**Maximum Upload Size**: 5 MB

**Note**: While the upload interface has a 5 MB limit for all file types, you can use Dynamic Mode with URLs to send larger files (up to WhatsApp's limits: 16 MB for videos/audio, 100 MB for PDFs).

---

### Dynamic Mode

**Best for**: Personalized content, variable media, externally hosted files

**How it works**:
1. Provide a URL that points to the file
2. URL can contain variables for personalization
3. File is fetched when needed and sent to user

**Supported URL Types**:

1. **Public URLs**:
   ```
   https://yourwebsite.com/files/document.pdf
   https://cdn.example.com/images/photo.jpg
   ```

2. **Variables**:
   ```
   {userProfilePicture}
   {invoiceURL}
   {productImage}
   ```

3. **Array Variables** (Multiple Files):
   ```
   {uploadedPhotos}
   {damageImages}
   ```

**Example with Variables**:
```
https://yourapi.com/invoices/{invoiceID}.pdf
```

**Pro Tip**: Use variables from previous components (like APIRequest) to send personalized media.

### Sending Multiple Files

The Media component can send multiple files sequentially if your variable contains an **array of URLs**:

**How it works**:
- **Single URL**: `{invoiceURL}` -> Sends one file
- **Array of URLs**: `{uploadedPhotos}` -> Sends all files in order

**Example**:
```
If {damagePhotos} = ["photo1.jpg", "photo2.jpg", "photo3.jpg"]
-> Media component sends all 3 photos sequentially
```

**Invalid URLs**: If some URLs in the array are invalid, they are **skipped** and valid ones are sent.

**Use Case**: Perfect for sending files collected by QuestionMedia component (which stores multiple files as arrays).

---

## Supported File Types & Sizes

### Images
- **Formats**: JPEG (.jpg), PNG (.png), GIF (.gif)
- **Maximum Size**: 5 MB
- **Best for**: Photos, graphics, infographics

### Videos
- **Formats**: MP4 (.mp4), QuickTime (.mov)
- **Maximum Size**: 16 MB
- **Best for**: Tutorials, demos, promotional videos
- **Note**: WhatsApp may compress videos

### Audio
- **Formats**: MP3 (.mp3), WAV (.wav), OGG (.ogg), Opus, WebM
- **Maximum Size**: 16 MB
- **Best for**: Voice messages, audio guides, music

### Documents
- **Formats**: PDF only (.pdf)
- **Maximum Size**: 100 MB
- **Best for**: Invoices, contracts, reports, guides
- **Note**: Other document types (Word, Excel) are not supported by WhatsApp

---

## Error Handling

### Error Output Port

Route the conversation when media sending fails:

1. Toggle **"Error Output Port"** to ON
2. Connect the error arrow to your error handling flow
3. Handle scenarios like:
    - File not found
    - File too large
    - Invalid file type
    - Network errors

### Error Message to User

Send a friendly message when errors occur:

1. Toggle **"Error Message to User"** to ON
2. Enter your message:
   ```
   Sorry, we couldn't send that file. Please try again or contact support.
   ```

**Dynamic Error Messages**:
```
Hi {userName}, we're having trouble sending your {mediaType}. Please try again.
```

### Admin Email Notification

Get notified when media sending fails:

1. Toggle **"Send Error Admin Email"** to ON
2. Receive error details via email for troubleshooting

---

## Common Use Cases

### 1. Send Product Image

**Scenario**: Show product photo from your catalog

**Configuration**:
- Media Type: `Image`
- Input Mode: `Dynamic`
- Media Source: `{productImageURL}`

**Setup**:
1. Use APIRequest to fetch product data
2. Store image URL in variable: `productImageURL`
3. Media component sends the image

---

### 2. Share Invoice PDF

**Scenario**: Send personalized invoice after purchase

**Configuration**:
- Media Type: `Document (pdf)`
- Input Mode: `Dynamic`
- Media Source: `invoices/{orderID}.pdf`

**Setup**:
1. Generate invoice on your server
2. Store in S3 as: `invoices/ORDER123.pdf`
3. Use order ID variable in Media component

---

### 3. Send Welcome Video

**Scenario**: Onboarding video for new users

**Configuration**:
- Media Type: `Video`
- Input Mode: `Static`
- Upload: `welcome_video.mp4` (under 16 MB)

**Setup**:
1. Upload video once during bot setup
2. Add to your welcome flow
3. Same video sent to all new users

---

### 4. Audio Tutorial

**Scenario**: Voice instructions in multiple languages

**Configuration**:
- Media Type: `Audio`
- Input Mode: `Dynamic`
- Media Source: `tutorials/{userLanguage}/instructions.mp3`

**Setup**:
1. Store audio files organized by language
2. Use language variable to select correct file
3. Personalized audio for each user

---

### 5. Send Multiple Photos (from QuestionMedia)

**Scenario**: Return uploaded damage photos to user or send to insurance API

**Configuration**:
- Media Type: `Image`
- Input Mode: `Dynamic`
- Media Source: `{damagePhotos}`

**Setup**:
1. Use QuestionMedia to collect multiple photos (max 3)
2. Variable `{damagePhotos}` contains array: `["photo1.jpg", "photo2.jpg", "photo3.jpg"]`
3. Media component sends all photos sequentially

**Flow**:
```
QuestionMedia: "Send up to 3 damage photos"
-> Stores: {damagePhotos} = ["url1", "url2", "url3"]
   -> Media: Sends all 3 photos back to user
   -> APIRequest: Uploads URLs to insurance system
```

---

## Best Practices

### File Optimization

**DO**:
- Compress images before uploading (use tools like TinyPNG)
- Keep videos under 10 MB for faster delivery
- Optimize PDFs (remove unnecessary elements)
- Use appropriate resolution (WhatsApp on mobile)
- Test files on mobile devices before deployment

**DON'T**:
- Upload unnecessarily large files
- Use exotic file formats
- Assume all users have fast internet

### Content Strategy

**DO**:
- Use relevant, high-quality media
- Ensure images have good contrast for mobile screens
- Add text alternative in message before media
- Keep videos short and engaging (under 1 minute ideal)
- Provide context in text before sending media

**DON'T**:
- Send media without explanation
- Overload users with too many files
- Send low-quality or pixelated images

### URL Management

**DO**:
- Use HTTPS URLs for security
- Verify URLs are publicly accessible (if using public URLs)
- Keep URL structure consistent
- Use CDN for better performance
- Check URLs regularly for availability

**DON'T**:
- Use HTTP (non-secure) URLs
- Use URLs that require authentication (for public URLs)
- Use temporary URLs that might expire
- Hardcode URLs that might change

---

## Troubleshooting

### Issue: "File too large" error

**Solution**: File exceeds size limits
1. Check the size limits for your media type:
   - Images: 5 MB
   - Videos/Audio: 16 MB
   - PDFs: 100 MB
2. Compress or optimize the file
3. For videos, reduce resolution or length

### Issue: "File type not supported"

**Solution**: Wrong file format
1. Verify file extension matches allowed formats
2. Convert file to supported format
3. Check MIME type matches file extension

### Issue: "File not found" (Dynamic mode)

**Solution**: URL or S3 key is incorrect
1. Verify the URL is publicly accessible
2. Check S3 key path is correct
3. Ensure variables contain valid values
4. Test URL in browser first

### Issue: Media not displaying properly

**Solution**: Format or encoding issue
1. Use standard formats (JPEG for images, MP4 for video)
2. Check file isn't corrupted
3. Test file on WhatsApp manually first
4. Re-export/convert file with different settings

### Issue: "Access denied" (S3 files)

**Solution**: Permission problem
1. Verify S3 bucket permissions
2. Check AWS credentials are configured
3. Ensure file exists in specified location
4. Confirm S3 key path is correct

### Issue: Slow media delivery

**Solution**: File too large or slow hosting
1. Optimize file size
2. Use CDN for better performance
3. Consider compressing images
4. Check your hosting server speed

---

## Technical Details

### File Validation

The Media component automatically validates:
- **File size**: Checked against WhatsApp limits
- **MIME type**: Verified to match expected format
- **File extension**: Checked for consistency
- **Accessibility**: URL tested before sending (dynamic mode)

### Delivery Process

**Static Mode**:
1. File uploaded to secure storage
2. URL generated when needed
3. Sent via WhatsApp Cloud API

**Dynamic Mode**:
1. URL or S3 key provided
2. File accessibility verified
3. Presigned URL generated (if S3)
4. Sent via WhatsApp Cloud API

### Security

- **Private S3 files**: Presigned URLs expire after 1 hour
- **Upload security**: Files scanned and validated
- **HTTPS only**: All URLs must use secure protocol

---

## Important Notes

### WhatsApp Limitations

**Be aware**:
- WhatsApp may compress images and videos
- Maximum file sizes are enforced by WhatsApp
- Only PDF documents are supported (no Word, Excel)
- Audio files might be transcoded
- GIFs are supported but may lose animation quality

### File Persistence

- **Static files**: Stored permanently on our servers
- **Dynamic URLs**: Must remain accessible when bot runs
- **S3 presigned URLs**: Generated fresh each time (1-hour expiry)

### Cost Considerations

- Static file storage counts towards your storage quota
- Large files consume more bandwidth
- Consider user data costs when sending large files

---

## Tips for Success

1. **Test First**: Always test media sending in a development bot before production
2. **Mobile-First**: Optimize for mobile viewing (most WhatsApp users)
3. **Fast Loading**: Keep files reasonably sized for quick delivery
4. **Fallback Plan**: Use error handling for graceful failures
5. **User Context**: Send media at the right time in conversation flow

---

## Need Help?

Email: contact@intalos.de

---

**Last Updated**: January 2025


