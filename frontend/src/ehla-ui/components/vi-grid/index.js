import {createSimpleFunctional} from '../../util/helper'
import Grid from './grid'
import ViRow from './vi-row'
const ViSpacer = createSimpleFunctional('vi-spacer', 'div')
const ViDivider = createSimpleFunctional('vi-divider', 'div')
const ViContainer = createSimpleFunctional('vi-container', 'div')
const ViCol = Grid('vi-col')
export {ViRow, ViCol, ViSpacer, ViContainer, ViDivider}
