import Link from 'next/link';

export default function AgreementFooterNutrition({referrer}: {referrer: string}) {
    return (
        <div className="mx-auto text-center bg-gradient-to-b from-muted/50 to-muted rounded-lg p-2">
            <h1>
                <Link href={`/tos?referrer=${referrer}`} className="underline m-1">Terms Of Service</Link>
            </h1>
        </div>
    );
}