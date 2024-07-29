import { FaqStatus, FaqType } from "../../enums/faqCategory.enum";

export interface FaqUpdate {
	_id: string;
	faqQuestion?: string;
	faqAnswer?: string;
	faqType?: FaqType;
	faqStatus?: FaqStatus;
}
