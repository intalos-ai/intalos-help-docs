# Bot Builder Interface

This guide covers the Bot Builder canvas controls and the pre-publish validation that runs when you publish your bot.

---

## Canvas Zoom Controls

The zoom toolbar appears on the Bot Builder canvas. Use it to navigate and focus on different parts of your bot flow.

### Toolbar Buttons

- **Zoom In** – Increases the zoom level (magnifies the canvas).
- **Zoom Out** – Decreases the zoom level.
- **Zoom to Extents** – Fits the entire diagram in view so all components are visible at once.

### Mouse Controls

- **Mouse wheel** – Scroll up to zoom in, scroll down to zoom out. The zoom is centered on the cursor position, so you can zoom into a specific area by hovering over it.
- **Right-click and drag** – Pan around the canvas.
- **Left-click** – Select and move components.
- **Left-click and hold** – Select multiple components and move them together. Hold Ctrl (Cmd on Mac) to add more components to the selection.

### When to Use

- **Zoom to Extents** – When you want an overview of the whole flow or lose your place on a large diagram.
- **Zoom In/Out** – When editing a specific part of the flow and need a closer or wider view.
- **Cursor-centered zoom** – When focusing on one component or section while building.

---

## Pre-Publish Validator

When you click **Publish**, the platform runs a validation check on your bot diagram. It reports any problems that could cause errors in production.

### What Gets Validated

The validator checks for:

**Blocking errors** (publish is blocked until fixed):

- Empty diagram or no publishable components
- Missing or invalid Start component (exactly one required)
- Components with no inbound connector
- Connectors with missing or invalid source/target
- Navigation buttons (Go Back / Go On) with missing labels or invalid configuration
- Duplicate option labels in QuestionButtons, QuestionList, LlmConversation, or APIRequest components

**Warnings** (publish is allowed, but you should review):

- **Dead-end component** – A non-terminal component has no outbound connector and may stop the flow
- **Unmapped error port** – A component with error output enabled has no connector from its error port
- **Unreachable component** – A component that cannot be reached from the Start node

### How Validation Works

1. Click **Publish** in the Bot Builder.
2. If validation fails, a message lists the issues.
3. For each error, the canvas pans to the first affected component.
4. Fix the reported issues and click **Publish** again.
5. If there are only warnings, you can still publish; review them and fix when possible.

### Common Fixes

| Issue | What to do |
|-------|------------|
| Dead-end component | Add an outbound connector from the component to the next step or an End component |
| Unmapped error port | Connect the error output port to a handler (e.g. error message, fallback flow) |
| Unreachable component | Connect the component into the main flow from Start |
| Missing Go Back/Go On label | Open the component, enable the button, and enter a label |
| Duplicate option labels | Give each option in QuestionButtons, LlmConversation, or APIRequest a unique label |
| No inbound connector | Connect the component from an upstream component (e.g. Start or a previous step) |

---

## Need Help?

**Email**: contact@intalos.de
