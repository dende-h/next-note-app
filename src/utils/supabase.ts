import { createClient } from "@supabase/supabase-js";

const getSupabase = (access_token: string) => {
	const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);

	if (access_token) {
		supabase.auth.session = () => ({
			token_type: null,
			access_token,
			user: null
		});
	}

	return supabase;
};

export { getSupabase };
