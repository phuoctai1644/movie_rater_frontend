import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppInjector } from 'src/app/app.module';

@Pipe({
  name: 'embedUrl'
})
export class EmbedUrlPipe implements PipeTransform {
  sanitizer = AppInjector.get(DomSanitizer);
  
  transform(url: string) {
    const trailer_obj = new URL(url as string);
    const params = trailer_obj.searchParams;
    const videoId = params.get('v');
    const hostName = trailer_obj.host;
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://${hostName}/embed/${videoId}`);
  }
}
