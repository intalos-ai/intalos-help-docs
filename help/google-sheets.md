# GoogleSheets Component

## Overview

The **GoogleSheets** component allows you to read from and write to Google Sheets spreadsheets directly from your bot. Perfect for storing form submissions, updating inventory, reading product catalogs, and managing data in spreadsheets.

## When to Use GoogleSheets

Ideal for scenarios like:
- Storing form responses in spreadsheets
- Updating inventory or availability
- Reading product information
- Managing customer data
- Recording orders or bookings
- Syncing data between bot and sheets
- Creating simple databases

---

## Setup Requirements

### Before You Start

1. **Google Account**: You need a Google account with access to Google Sheets
2. **Google Drive Access**: Authorize Intalos to access your Google Drive
3. **Spreadsheet**: Create or have access to a Google Sheets file
4. **Column Headers**: First row must contain column headers

---

## Quick Setup

### Step 1: Connect Google Account

1. Click **"Login with Google"** in the component
2. Authorize Intalos AI Bot Builder
3. Select your Google account
4. Grant permissions to access Google Sheets

### Step 2: Select Spreadsheet

1. Click **"Select Spreadsheet"** button
2. Browse your Google Drive
3. Select the spreadsheet you want to use
4. Component loads the sheet names and headers

### Step 3: Choose Sheet

1. From the **"Sheet"** dropdown, select which sheet (tab) to use
2. Headers from first row are automatically loaded

### Step 4: Select Action

Choose what you want to do:
- **Insert a row** - Add new data
- **Update a row** - Modify existing data
- **Use data from sheet** - Read existing data
- **Delete a row** - Remove data

---

## Actions Explained

### 1. Insert a Row

**Purpose**: Add new data to the bottom of your sheet

**Configuration**:
1. Select **"Insert a row"**
2. Map sheet columns to bot variables:
   - Column: "Customer Name" -> Variable: `{userName}`
   - Column: "Email" -> Variable: `{userEmail}`
   - Column: "Order Total" -> Variable: `{orderTotal}`

**How it works**:
- New row appended to sheet
- Variables inserted into specified columns
- Empty columns left blank
- No duplicate checking

**Example**:
```
Spreadsheet columns: Name | Email | Phone | Date
Bot variables: {userName} | {userEmail} | {userPhone} | {currentDate}
Result: New row with customer data added
```

### 2. Update a Row

**Purpose**: Find and update existing data in a row

**Configuration**:
1. Select **"Update a row"**
2. **Reference column**: Column to search (e.g., "Email")
3. **Reference value**: Variable to match (e.g., `{userEmail}`)
4. **Update columns**: Which columns to update
   - Column: "Status" -> Variable: `{newStatus}`
   - Column: "Last Contact" -> Variable: `{currentDate}`

**How it works**:
- Searches for row where reference column matches reference value
- Updates specified columns in that row
- If multiple matches, updates first match
- If no match, routes to "not found" port

**Example**:
```
Find row where Email = {userEmail}
Update Status column to {newStatus}
Update Last Contact to {currentDate}
```

### 3. Use Data from Sheet

**Purpose**: Read data from an existing row

**Configuration**:
1. Select **"Use data from sheet"**
2. **Reference column**: Column to search
3. **Reference value**: Variable to match
4. **Data columns**: Which columns to read
   - Column: "Product Price" -> Store in: `{productPrice}`
   - Column: "Stock Status" -> Store in: `{stockStatus}`

**How it works**:
- Searches for row where reference column matches reference value
- Reads specified columns from that row
- Stores values in bot variables
- If no match, routes to "not found" port

**Example**:
```
Find row where Product ID = {selectedProduct}
Read Price column -> store in {productPrice}
Read Stock column -> store in {stockLevel}
```

### 4. Delete a Row

**Purpose**: Remove a row from the sheet

**Configuration**:
1. Select **"Delete a row"**
2. **Reference column**: Column to search
3. **Reference value**: Variable to match

**How it works**:
- Searches for row where reference column matches reference value
- Deletes entire row
- Shifts remaining rows up
- If no match, routes to "not found" port

**Example**:
```
Find row where Order ID = {cancelledOrder}
Delete the entire row
```

---

## Column-Variable Mapping

### How Mapping Works

For each action, you map spreadsheet columns to bot variables:

**Insert a row**:
```
Sheet Column    ->    Bot Variable
"Name"          ->    {userName}
"Email"         ->    {userEmail}
"Phone"         ->    {userPhone}
```

**Update a row**:
```
Find by:  "Email" = {userEmail}
Update:   "Status" -> {orderStatus}
Update:   "Notes" -> {orderNotes}
```

**Use data from sheet**:
```
Find by:  "Product ID" = {productId}
Read:     "Price" -> {productPrice}
Read:     "Stock" -> {stockQuantity}
```

### Reference Column

For update, read, and delete actions:

**Reference column**: Which column to search in
**Reference value**: What value to look for

Think of it as: "Find the row where [Reference Column] equals [Reference Value]"

---

## Use Cases & Examples

### 1. Store Form Submissions

**Action**: Insert a row 
**Spreadsheet**: Contact Form Responses 
**Columns**: Name, Email, Phone, Message, Date

**Configuration**:
```
Name -> {userName}
Email -> {userEmail}
Phone -> {userPhone}
Message -> {userMessage}
Date -> {currentDate}
```

**Flow**:
```
Collect name -> Collect email -> Collect phone -> Collect message
-> GoogleSheets (insert row)
   -> Confirmation message
```

### 2. Update Order Status

**Action**: Update a row 
**Spreadsheet**: Orders Database 
**Reference**: Order ID

**Configuration**:
```
Find by: Order ID = {orderId}
Update: Status -> "Confirmed"
Update: Updated At -> {currentTimestamp}
```

### 3. Product Catalog Lookup

**Action**: Use data from sheet 
**Spreadsheet**: Product Catalog 
**Reference**: Product ID

**Configuration**:
```
Find by: Product ID = {selectedProduct}
Read: Price -> {productPrice}
Read: Description -> {productDescription}
Read: Stock -> {stockLevel}
```

**Flow**:
```
User selects product
-> GoogleSheets (read product data)
   |-- Found -> Show product details
   \-- Not found -> "Product unavailable"
```

### 4. Cancel Booking

**Action**: Delete a row 
**Spreadsheet**: Bookings 
**Reference**: Booking ID

**Configuration**:
```
Find by: Booking ID = {bookingId}
Delete row
```

---

## Best Practices

### Spreadsheet Structure

**DO**:
- Use clear, descriptive column headers
- Keep first row as headers only
- Use consistent data formats
- Avoid special characters in headers
- Keep sheet organized and clean

**DON'T**:
- Use merged cells in header row
- Leave header row empty
- Use duplicate column names
- Include formulas in header row

### Data Management

**DO**:
- Validate data before inserting
- Use reference columns wisely (unique IDs)
- Handle "not found" scenarios
- Test with sample data first
- Back up important spreadsheets

**DON'T**:
- Insert duplicate records without checking
- Use non-unique reference columns
- Skip error handling
- Modify production data during testing

### Variable Mapping

**DO**:
- Map all required columns
- Use appropriate variable names
- Validate data types match
- Test mappings thoroughly

**DON'T**:
- Leave required columns unmapped
- Use undefined variables
- Mix up column names
- Skip testing

---

## Flow Routing

### Standard Flow

All actions have:
- **Success port** -> Action completed successfully
- **Error port** -> Something went wrong

### Actions with "Not Found" Port

Update, Read, and Delete actions have additional routing:
- **Success port** -> Row found and processed
- **Not found port** -> Reference value not found in sheet
- **Error port** -> System error

**Example routing**:
```
GoogleSheets (Update row)
|-- Success -> "Order updated successfully"
|-- Not found -> "Order not found. Please check your order ID"
\-- Error -> "System error. Please try again"
```

---

## Error Handling

### Error Output Port

Route the conversation when errors occur:

1. Toggle **"Error Output Port"** to ON
2. Connect the error arrow to your error handling flow
3. Handle scenarios like:
    - Authentication failures
    - Permission denied
    - Sheet not found
    - Invalid column names
    - Network errors

### Not Found Output Port

For actions that search for rows (Update, Read, Delete):

1. Automatically enabled for these actions
2. Connect the "not found" arrow to handle missing data
3. Provide helpful user feedback

**Example**:
```
Not found -> "We couldn't find that order. Please check your order number and try again."
```

### Error Message to User

Send a custom message when errors occur:

1. Toggle **"Error Message to User"** to ON
2. Enter your message:
   ```
   Sorry, we couldn't access the database. Please try again later.
   ```

### Admin Email Notification

Get notified when errors occur:

1. Toggle **"Admin email when error"** to ON
2. Notifications include error details

---

## Technical Details

### Authentication

- **OAuth 2.0**: Secure Google authentication
- **Token refresh**: Automatic token renewal
- **Permissions**: Read/write access to Google Sheets
- **Scope**: Limited to Sheets API only

### API Limits

Google Sheets API has limits:
- **Read requests**: 300 per minute per project
- **Write requests**: 300 per minute per project
- **Cells**: 10 million cells per spreadsheet

**Best practices**:
- Don't update sheets on every message
- Batch operations when possible
- Monitor usage in Google Cloud Console

### Data Types

**Supported**:
- Text/strings
- Numbers
- Dates (as text)
- Booleans (as text: "true"/"false")

**Not supported**:
- Images
- File attachments
- Formulas (can read formula results as values)

### Row Operations

**Insert**:
- Appends to bottom of sheet
- Skips empty rows
- Adds data to next available row

**Update/Read/Delete**:
- Searches from top to bottom
- Matches first occurrence
- Case-sensitive matching
- Exact match required

---

## Security & Privacy

### Data Security

**DO**:
- Only grant access to necessary sheets
- Use separate spreadsheets for sensitive data
- Regularly audit access permissions
- Revoke access when no longer needed

**DON'T**:
- Share spreadsheets with sensitive data publicly
- Store passwords or API keys in sheets
- Grant unnecessary permissions

### Access Control

- **View permissions**: Control in Google Sheets
- **Edit permissions**: Required for insert/update/delete
- **Sharing**: Manage in Google Drive
- **Revoke access**: Available in Google account settings

---

## Troubleshooting

### Issue: "Authentication failed"

**Check**:
- Google account is still authorized
- Re-authorize if needed
- Refresh token hasn't expired
- Account has access to the spreadsheet

**Solution**:
- Click "Login with Google" again
- Re-select your account
- Re-authorize permissions

### Issue: "Permission denied"

**Check**:
- You have edit access to the spreadsheet
- Spreadsheet isn't in read-only mode
- Sheet isn't protected

**Solution**:
- Check sharing settings in Google Sheets
- Request edit access from owner
- Remove sheet protection if applicable

### Issue: "Row not found"

**Check**:
- Reference column name is correct
- Reference value matches exactly (case-sensitive)
- Row actually exists in sheet
- No extra spaces in reference value

**Solution**:
- Verify column name in spreadsheet
- Check variable value matches sheet data
- Use CustomCode to trim/clean reference values

### Issue: "Column not found"

**Check**:
- Column name matches header exactly
- No typos in column name
- Header row is row 1
- Sheet has been selected

**Solution**:
- Refresh component configuration
- Re-select spreadsheet
- Verify column names in sheet
- Check for hidden columns

### Issue: Data not inserting

**Check**:
- Variables have values
- Column mapping is correct
- Sheet isn't full (10M cell limit)
- No formula errors in sheet

**Solution**:
- Test with static values first
- Verify variables exist and have data
- Check sheet for errors

---

## Advanced Patterns

### Lookup and Insert Pattern

```
QuestionText (email)
-> GoogleSheets (Check if email exists)
   |-- Found -> "Welcome back!"
   \-- Not found -> Collect more info
                   -> GoogleSheets (Insert new customer)
```

### Update with Validation

```
Collect order ID
-> GoogleSheets (Use data from sheet)
   |-- Found -> Show order details
   │          -> Confirm cancellation
   │             -> GoogleSheets (Update status)
   \-- Not found -> "Invalid order ID"
```

### Multi-Sheet Operations

```
GoogleSheets (Insert to Orders sheet)
-> GoogleSheets (Update Inventory sheet)
   -> GoogleSheets (Insert to Notifications sheet)
```

---

## Need Help?

Email: contact@intalos.de

---

**Last Updated**: January 2025

