# Changelog

# Changelog for Version 1.0.5 - 2024-12-25

## 🚀 New Features

1. **Formatting Support**:
   - Added the `formatType` property for column definitions to enable automatic formatting of values as:
     - `date`: Formats dates in `DD MMM YYYY` format.
     - `currency`: Formats numbers as currency with symbols.
     - `percentage`: Formats numbers as percentages.
     - `text`: Default text rendering.

2. **Improved Fallback Rendering**:
   - Missing or `null` values are now automatically replaced with `'-'` to ensure consistent and user-friendly table displays.

3. **Hover Feedback**:
   - Added interactive column headers for better visual feedback during sorting operations.

## 🛠️ Bug Fixes

1. **Type Safety Improvements**:
   - Enhanced TypeScript type checks to ensure proper handling of `null` and `undefined` values.
   - Fixed an issue with custom render functions not handling edge cases properly.

2. **Sorting Logic**:
   - Refactored sorting implementation to work seamlessly with formatted values (`formatType`).

## 📖 Documentation Updates

1. Updated examples to showcase the use of `formatType`.
2. Added descriptions for fallback rendering behavior and customization options.

---

## [1.0.3] - 2024-12-25
### Added
- Added support for `rowClassName` prop to dynamically apply styles to rows.
- Implemented `hoveredColumnKey` state to highlight columns on hover.
- Enhanced sorting functionality to include ascending and descending orders.

### Changed
- Refactored the `toggleRowSelection` function for better readability and performance.
- Updated `render` logic to handle virtual keys (`__virtualKey1`, `__virtualKey2`) and display `N/A` if no data is available.

### Fixed
- Resolved issue with the `selectable` prop requiring a `primaryKey` to be defined.
- Corrected sorting behavior when `null` or `undefined` values are present in data.

### Notes
- Ensure that the peer dependencies (`react`, `react-dom`, `lucide-react`) are installed for proper functionality.
