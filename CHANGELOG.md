# Changelog

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
