import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { MatButtonModule, MatToolbarModule, MatCardModule, MatGridListModule, MatInputModule, MatSidenavModule, MatDividerModule, MatListModule, MatProgressSpinnerModule, MatSnackBarModule, MatTooltipModule, MatSelectModule, MatChipsModule, MatTabsModule, MatMenuModule } from '@angular/material';

const MaterialComponents = [
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatInputModule,
  MatToolbarModule,
  MatSidenavModule,
  MatDividerModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatSelectModule,
  MatChipsModule,
  MatTabsModule,
  MatMenuModule,
];

@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule {}
