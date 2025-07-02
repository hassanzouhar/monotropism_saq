# Monotropism Questionnaire (MQ) - Web Application

## Overview

This web application implements the Monotropism Questionnaire (MQ), a validated psychometric instrument developed by Garau et al. (2023) for measuring monotropic cognitive style. The questionnaire was developed through participatory research with autistic adults and provides a non-pathologizing framework for understanding attention allocation and interest-based processing patterns.

## Research Foundation

### Theoretical Background
Monotropism theory, developed by autistic scholars Dinah Murray, Wenn Lawson, and Mike Lesser, proposes that the human mind functions as an "interest-system" where finite attentional resources are distributed across interests. The theory distinguishes between:

- **Monotropic minds**: Fewer interests highly aroused simultaneously, with deep focused attention ("attention tunnels")
- **Polytropic minds**: Attention distributed across more interests at varying levels of intensity

### Validation Study
The MQ is based on research by Garau et al. (2023) involving 1,109 participants, demonstrating:
- **Excellent internal consistency**: McDonald's Omega (ωt) = 0.96
- **Strong known-groups validity**: Significant differentiation between autistic and non-autistic groups
- **Robust convergent validity**: Strong correlations with established autism measures (RAADS-14: rs = .78; AQ-10: rs = .71)
- **Eight-factor structure**: Confirmed through Exploratory Factor Analysis explaining 57.4% of variance

## Technical Specifications

### Psychometric Properties
- **47-item questionnaire** with 5-point Likert scale (1-5) plus "Not applicable" option
- **Reverse scoring** implemented for 7 items (6, 11, 15, 16, 17, 31, 46)
- **Minimum completion threshold**: 40 items required for valid scoring
- **Average score calculation**: Final scores expressed as mean (1-5 scale)

### Eight-Factor Model
The questionnaire measures eight distinct but correlated dimensions:
1. **Special interests** (8 items) - 15% variance
2. **Rumination and anxiety** (5 items) - 12% variance  
3. **Need for routines** (2 items) - 10% variance
4. **Environmental impact on attention tunnel** (8 items) - 7% variance
5. **Losing track when focusing** (4 items) - 13% variance
6. **Struggle with decision-making** (4 items) - 11% variance
7. **Anxiety-reducing effect of interests** (3 items) - 9% variance
8. **Managing social interactions** (6 items) - 13% variance

### Predictive Model
Multiple linear regression model for score prediction based on diagnostic status:
- **Base score** (non-autistic, no ADHD): 3.03
- **Autism effect**: +1.04
- **ADHD effect**: +0.56  
- **Autism × ADHD interaction**: -0.43
- **Model R²**: 0.574 (p < .001)

## Features

### Assessment Flow
1. **Introduction**: Theory overview and ethical considerations
2. **Demographics**: Autism/ADHD status collection for score contextualization
3. **Questionnaire**: Progressive question-by-question interface with multiple navigation options
4. **Results**: Comprehensive scoring with factor profile analysis

### Progress Tracking
- Real-time completion percentage
- Section-based progress indicators
- Visual navigation grid with status indicators
- Minimum threshold tracking (40-item requirement)

### Scoring Implementation
- Validated 1-5 scale scoring protocol
- Automatic reverse scoring for designated items
- Eight-factor subscale calculation
- Diagnostic context integration via regression model

## Usage Guidelines

### Clinical Applications
- **Assessment tool** for understanding individual cognitive style patterns
- **Treatment planning** aid for personalized intervention strategies  
- **Self-understanding** resource for neurodivergent individuals
- **Research instrument** for monotropism-related studies

### Important Limitations
- **Not a diagnostic instrument**: Cannot diagnose autism, ADHD, or other conditions
- **Cognitive style measure**: Assesses attention allocation patterns, not pathology
- **Population specificity**: Validated primarily in English-speaking, educated populations
- **Snapshot assessment**: Represents current self-reported patterns

## Ethical Considerations

### Appropriate Use
- Collaborative exploration of cognitive patterns
- Research applications following established protocols
- Clinical adjunct for qualified practitioners
- Educational and self-advocacy purposes

### Inappropriate Use
- Standalone diagnostic decision-making
- Employment screening or discrimination
- Educational gatekeeping
- Insurance or legal determinations

## Technical Requirements

### Dependencies
- React 18+
- Lucide React (icons)
- Modern browser with JavaScript enabled
- No external APIs or data storage

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Implementation Notes

### Data Handling
- All data processed client-side
- No external transmission or storage
- Session-based state management
- No persistent user tracking

### Accessibility
- Keyboard navigation support
- Screen reader compatible
- High contrast visual indicators
- Progressive disclosure interface

## Citation

When using this implementation in research or clinical practice, please cite:

Garau, V., Tõpingas, M. T., Olofsson, G., Lees, T., Hobday, H., Baltruks, D., Murray, A., & Stanton, S. (2023). Development and validation of the Monotropism Questionnaire. *Journal of Autism and Developmental Disorders*. [DOI to be updated with actual publication details]

## License and Permissions

This implementation is based on publicly available research. Users are responsible for ensuring appropriate ethical oversight for any research or clinical applications.

## Development Status

**Version**: 1.0.0
**Status**: Research implementation
**Last Updated**: 2025

For technical support or research collaboration inquiries, please refer to the original validation study methodology and consult with qualified researchers in the field of autism and neurodiversity studies.